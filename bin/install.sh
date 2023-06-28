#!/bin/bash

# Generate the .env file if it does not exist
if ! [ -f "./.env" ]; then
    # Copy .env file from development template
    cp dot.env.local .env
fi

npm install
