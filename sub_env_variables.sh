#!/bin/sh

ROOT_DIR=/usr/share/nginx/html
# Replace env vars in files served by NGINX
for file in $ROOT_DIR/js/*.js* $ROOT_DIR/index.html;
do
    sed -i 's|VUE_APP_DOMAIN_NAME|'${VUE_APP_DOMAIN_NAME}'|g' $file
    sed -i 's|VUE_APP_BACKEND_BASE_API|'${VUE_APP_BACKEND_BASE_API}'|g' $file
done

# Starting NGINX
nginx -g 'daemon off;'