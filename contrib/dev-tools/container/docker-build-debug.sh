#!/bin/bash

echo "Building docker image ..."

USER_ID=${USER_ID:-1001}
TORRUST_INDEX_GUI_API_BASE_URL=${TORRUST_INDEX_GUI_API_BASE_URL:-http://localhost:3001/v1}

echo "USER_ID: $USER_ID"
echo "TORRUST_INDEX_GUI_API_BASE_URL: $TORRUST_INDEX_GUI_API_BASE_URL"

docker build \
    --build-arg USER_ID="$USER_ID" \
    --build-arg API_BASE_URL="$TORRUST_INDEX_GUI_API_BASE_URL" \
    --target debug \
    --tag torrust-index-gui:debug \
    --file Containerfile .
