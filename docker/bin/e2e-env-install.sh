#!/bin/bash

# Generate the .env file if it does not exist
if ! [ -f "./.env" ]; then
    # Copy .env file from development template
    cp dot.env.local .env
fi

# Generate storage directory if it does not exist
mkdir -p "./storage/index/lib/database/"
mkdir -p "./storage/tracker/lib/database/"

# Generate the sqlite database for the index backend if it does not exist
if ! [ -f "./storage/index/lib/database/e2e_testing_sqlite3.db" ]; then
    sqlite3 ./storage/index/lib/database/e2e_testing_sqlite3.db "VACUUM;"
fi

# Generate the sqlite database for the tracker if it does not exist
if ! [ -f "./storage/tracker/lib/database/e2e_testing_sqlite3.db" ]; then
    sqlite3 ./storage/tracker/lib/database/e2e_testing_sqlite3.db "VACUUM;"
fi

npm install
