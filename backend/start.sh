#!/bin/sh
while ! nc -z db 5432; do sleep 3; done
node ace migration:run
node server.js