#!/bin/bash

npm install

cp .env.local .env || exit

npm run build
