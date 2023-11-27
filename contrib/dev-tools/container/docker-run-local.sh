#!/bin/bash

mkdir -p ./storage/index-gui/lib/ ./storage/index-gui/log/ ./storage/index-gui/etc/

docker run -it \
    --env USER_ID"$(id -u)" \
    --publish 3000:3000/tcp \
    torrust-index-gui:release
