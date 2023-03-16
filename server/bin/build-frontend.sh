#!/bin/bash

npm install

echo "VITE_API_BASE_URL=http://0.0.0.0:3000" > .env

npm run build
