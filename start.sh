#!/bin/sh
if [ -n "$TARGET_DATE" ]; then
  echo "var targetDate = '$TARGET_DATE'" > /usr/share/nginx/html/static/config.js
fi
exec nginx -g 'daemon off;'