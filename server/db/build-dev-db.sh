#!/bin/bash

# Export variables from .env
set -o allexport
source ../.env
set +o allexport

psql -d "$DB_NAME" -f "create-tables.sql";
node ./basic-data.js && node ./dummy-data.js;
