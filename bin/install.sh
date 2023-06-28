#!/bin/bash

# Generate the .env file if it does not exist
if ! [ -f "./.env" ]; then
    echo "API_BASE_URL=http://localhost:3001/v1" > .env
fi

npm install
