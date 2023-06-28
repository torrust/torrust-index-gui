#!/bin/bash

TORRUST_IDX_FRON_USER_UID=${TORRUST_IDX_FRON_USER_UID:-1001}

docker run -it \
    --user="$TORRUST_IDX_FRON_USER_UID" \
    --publish 3000:3000/tcp \
    torrust-index-frontend
