#!/bin/sh
envsubst '${PORT}' < /etc/nginx/templates/nginx.conf > /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'