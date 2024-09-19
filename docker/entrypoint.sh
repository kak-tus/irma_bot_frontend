#!/usr/bin/env sh

envsubst < /usr/share/nginx/html/env.src.js > /usr/share/nginx/html/env.js

nginx -g "daemon off;"
