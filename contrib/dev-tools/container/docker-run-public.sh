#!/bin/bash

mkdir -p ./storage/index-gui/log/

docker run -it \
    --env USER_ID="$(id -u)" \
    --publish 3000:3000/tcp \
    torrust/index-gui:latest
