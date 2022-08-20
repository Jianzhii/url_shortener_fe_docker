# build stage
FROM node:16.17-alpine as build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# production stage
FROM nginx:stable-alpine as production-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf

# Overriding the default NGINX container behavior
COPY ./sub_env_variables.sh /sub_env_variables.sh
RUN chmod +x /sub_env_variables.sh
ENTRYPOINT ["/sub_env_variables.sh"]