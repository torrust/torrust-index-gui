# syntax=docker/dockerfile:latest

# Torrust Index GUI

## Su Exe Compile
FROM docker.io/library/gcc:bookworm as gcc
COPY ./contrib/dev-tools/su-exec/ /usr/local/src/su-exec/
RUN cc -Wall -Werror -g /usr/local/src/su-exec/su-exec.c -o /usr/local/bin/su-exec; chmod +x /usr/local/bin/su-exec


## Builder Image
FROM node:21-bookworm as builder
RUN mkdir -p /app
WORKDIR /app


## Build dependencies
FROM builder as dependencies
COPY package.json .
COPY package-lock.json .
RUN npm install-clean


## Build application
FROM dependencies as test
ARG API_BASE_URL=http://localhost:3001/v1
ENV API_BASE_URL=${API_BASE_URL}
COPY . .
RUN npm run build


## Runtime
FROM gcr.io/distroless/nodejs20-debian12:debug as runtime
RUN ["/busybox/cp", "-sp", "/busybox/sh","/busybox/cat","/busybox/ls","/busybox/env", "/bin/"]
COPY --from=gcc --chmod=0555 /usr/local/bin/su-exec /bin/su-exec

ARG USER_ID=1000
ARG INDEX_GUI_PORT=3000
ARG NUXT_PUBLIC_API_BASE0=http://localhost:3001/v1

ENV TZ=Etc/UTC
ENV USER_ID=${USER_ID}
ENV INDEX_GUI_PORT=${INDEX_GUI_PORT}
ENV NUXT_PUBLIC_API_BASE=${NUXT_PUBLIC_API_BASE}

EXPOSE $INDEX_GUI_PORT/tcp

RUN mkdir -p /var/log/torrust/tracker

ENV ENV=/etc/profile
COPY --chmod=0555 ./share/container/entry_script_sh /usr/local/bin/entry.sh
COPY --chmod=0555 ./share/container/health_check.js /usr/local/bin/health_check.js

VOLUME ["/var/log/torrust/index-gui"]

ENV RUNTIME="runtime"
ENTRYPOINT ["/usr/local/bin/entry.sh"]

## Torrust-Index-GUI (debug)
FROM runtime as debug
ENV RUNTIME="debug"
COPY --from=test /app/.output /app/.output
RUN env
CMD ["sh"]


## Torrust-Index-GUI (release) (default)
FROM runtime as release
ENV RUNTIME="release"
COPY --from=test /app/.output /app/.output
HEALTHCHECK --interval=5s --timeout=5s --start-period=3s --retries=3 \
  CMD /nodejs/bin/node /usr/local/bin/health_check.js ${INDEX_GUI_PORT} || exit 1
CMD [ "/nodejs/bin/node", "/app/.output/server/index.mjs" ]
