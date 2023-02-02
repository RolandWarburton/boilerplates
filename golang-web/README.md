# Web Setup in Golang

I wrote this to teach myself how to do web stuff in golang.

The project follows a MVC inspired layout.
Gin-Gonic provides a model and controller. The view is written in react.

What you get from this project is:

* A simple accounts view with CRUD account management abilities.
* Authentication middleware using JWT.
* A proxy layer using nginx.
* Docker orchestration.

Where to from here?

Check out the `database` folder, start renaming the database name from "example"
to something relevant for your project. You will need to hunt around for all other mentions of this
name in all project directories unfortunately to get it all working.

Check out the `backend` folder, learn how a route is created from the factory pattern,
how routes call controller methods, and where middleware is exists.

## Getting Started

Check `nginx/keys` and generate a private key using the provided `gen.sh`.

Create required volume and network.

```none
docker volume create example_data
docker network create example_net
```

Build and run using compose.

```none
docker-compose build && \
docker-compose up
```

## Login (auth tokens)

To obtain an auth token for development purposes you can use a HTTP client and POST to `/auth`.

For example using [httpie](https://httpie.io/)
and its [jwt plugin](https://github.com/teracyhq/httpie-jwt-auth) you can do a request as follows.

```none
http -j POST 'localhost:3000/auth' 'username=roland' 'password=password' 
```

You can then re-use that token later.

```none
using the auth type jwt via the exposed api
http --auth-type=jwt --auth='<TOKEN>' 'localhost:3000/accounts'

or going through the gateway
http --auth-type=jwt --auth="$TOKEN" --verify=no https://localhost/api/v1/accounts

or without using the auth type jwt through the gateway
http --verify=no GET https://localhost/api/v1/accounts username='roland' password='password' Authorization:"Bearer $TOKEN"
```

## Adminer details

system: PostgreSQL \
server: example_db \
username: example \
password: rhinos \
database: example

Or from within the database:

```none
psql -h localhost -d example -U example
```

## Development

To rebuild the example_server.

```none
docker stop example_server; docker-compose build example_server; docker-compose up -d example_server
```

To run the front end in development mode, change the `docker-compose.yaml` to target development.

```yaml
  example_frontend:
    container_name: example_frontend
    image: example_frontend
    build:
      context: ./frontend
      # change this line
      target: development
      dockerfile: dockerfile
```

## Production

To run in production edit `docker-compose.yaml` and change the target for `example_proxy`
and `example_frontend` to `production`. Make sure to rebuild the containers.

```none
docker-compose build && docker-compose up
```
