#!/bin/bash

USER_ID=${USER_ID:-1000} \
    docker compose build

USER_ID=${USER_ID:-1000} \
    TORRUST_INDEX_CONFIG=$(cat config-idx-back.local.toml) \
    TORRUST_TRACKER_CONFIG=$(cat config-tracker.local.toml) \
    TORRUST_TRACKER_DATABASE=${TORRUST_TRACKER_DATABASE:-sqlite3} \
    TORRUST_TRACKER_API_ADMIN_TOKEN=${TORRUST_TRACKER_API_ADMIN_TOKEN:-MyAccessToken} \
    docker compose up -d
