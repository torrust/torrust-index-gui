#!/bin/bash

mkdir -p ./storage/index-gui/log/

docker run -it \
    --env USER_ID="$(id -u)" \
    --env NUXT_PUBLIC_API_BASE="http://localhost:3001/v1" \
    --publish 3000:3000/tcp \
    torrust/index-gui:latest
