# URL Shortener Service Frontend

## Installation of packages

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

## .env File

A `.env` file can be added optionally if it is necessary to dynamically set the variables as specified below. Otherwise it will default to the values as indicated. The `.env` file is to be added to the root folder of the application.

```
VUE_APP_DOMAIN_NAME=http://localhost/
VUE_APP_BACKEND_BASE_API=http://localhost:3000
```

## Docker Image

A `Dockerfile` is included to build the application into a container image and to deliver the web pages via Nginx. A similar image has also been published to Docker Registry and can be pulled using the following command:

```bash
# building image locally
$ docker build -t <image_name> .

# pulling from Docker Registry
$ docker pull jzshum/url_shortener_be
```

As Vue.js reads and injects the environment variables during build time as hardcoded strings, the image which runs an already built application is not able to read and process environment variables dynamically. As such, the values in `.env` file will need to be changed to placeholder values when building the Docker image, which will be replaced by actually environment variables during runtime through the `sub_env_variables.sh` script.

```bash
VUE_APP_DOMAIN_NAME=VUE_APP_DOMAIN_NAME
VUE_APP_BACKEND_BASE_API=VUE_APP_BACKEND_BASE_API
```

## Running the app in a container

Once the image has been pulled or created, it can be started within a docker container with the following command:

```bash
$ docker run -d -p 3000:3000 --env-file .env <image_name>
```

where the `.env` is the same `.env` used to start the application locally and contain the same variables mentioned in the earlier [section](#env-file) on `.env` and should contain actually values instead of the placeholder values.
