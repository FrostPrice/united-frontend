#!/bin/sh

date=$(date)
echo $date

echo Starting United - React

# Add VITE_APP_PORT
if [ -z ${VITE_APP_PORT} ]; then
    echo Port not defined, using default: 80
    VITE_APP_PORT=80
else
    echo Port: $VITE_APP_PORT
fi

sed -i "s/\${VITE_APP_PORT}/$VITE_APP_PORT/g" /etc/nginx/conf.d/default.conf.template

cp /etc/nginx/conf.d/default.conf.template /etc/nginx/conf.d/default.conf

exec nginx -g 'daemon off;'