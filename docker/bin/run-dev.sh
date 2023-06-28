#!/bin/bash

TORRUST_IDX_FRON_USER_UID=${TORRUST_IDX_FRON_USER_UID:-1000}

docker run -it \
    --user="$TORRUST_IDX_FRON_USER_UID" \
    --publish 3000:3000/tcp \
    --volume "$(pwd)":"/app" \
    torrust-index-frontend
