FROM node:20.2 as base

RUN mkdir -p /app
WORKDIR /app

COPY package.json .
COPY package-lock.json .
RUN npm install-clean


FROM base as development
WORKDIR /app
ARG UID=1001
ARG RUN_AS_USER=appuser
ARG IDX_FRONT_PORT=3000
ARG API_BASE_URL=http://localhost:3001/v1
# Add the app user for development
ENV USER=appuser
ENV UID=$UID
RUN adduser --uid "${UID}" "${USER}"
# Build the app
COPY . .
ENV API_BASE_URL=$API_BASE_URL
RUN npm run build
USER $RUN_AS_USER:$RUN_AS_USER
EXPOSE $IDX_FRONT_PORT/tcp
CMD ["npm", "run", "dev"]


FROM base as production
WORKDIR /app
ARG UID=1001
ARG RUN_AS_USER=appuser
ARG IDX_FRONT_PORT=3000
ARG API_BASE_URL=http://localhost:3001/v1
# Add the app user for production
ENV USER=appuser
ENV UID=$UID
RUN adduser \
  --disabled-password \
  --gecos "" \
  --home "/nonexistent" \
  --shell "/sbin/nologin" \
  --no-create-home \
  --uid "${UID}" \
  "${USER}"
# Build the app
COPY . .
ENV API_BASE_URL=$API_BASE_URL
RUN npm run build
# Timezone  
ENV TZ=Etc/UTC
ENV RUN_AS_USER=$RUN_AS_USER
RUN chown -R $RUN_AS_USER:$RUN_AS_USER /app
USER $RUN_AS_USER:$RUN_AS_USER
EXPOSE $IDX_FRONT_PORT/tcp
CMD [ "node", "/app/.output/server/index.mjs" ]