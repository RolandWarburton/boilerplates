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

## Getting Started - Building

Make sure you are using the new buildkit.

```none
export DOCKER_BUILDKIT=1
```

Check `nginx/keys` and generate a private key using the provided `gen.sh`.

Create required volume and network.
You can rename the examples in `docker-compose.yaml` to target the correct names.

```none
docker volume create example_data
docker network create example_net
```

Build and run using compose.

```none
docker-compose build && \
docker-compose up
```

## Accessing The Database Web UI

Adminer is used to expose a web UI for the database.

Read database/README.md to see information about how to connect to the database.

## Login (auth tokens)

When the database is run, init.sql will create some accounts.
See `database/init.sql` to see details about them.

Passwords are hashed when they are sent to the server.
To get a SHA of your password you can use this snippet.

```none
printf 'MYPASSWORD' | sha256sum | cut -d '-' -f1 | xargs
```

To obtain an auth token (JWT) for development purposes
you can use a HTTP client and POST to `/auth`.

```none
curl -X POST "http://localhost:3000/auth" \
    -H "Content-Type: application/json" \
    -d '{"username":"roland","password":"sha256_of_password"}' | jq -r '.data.token'
```

You can then re-use that token later for future requests.

The above has been simplified into a script to set a token variable.
Running `eval $(node getToken.js)` will result in
`$TOKEN` (the JWT) and `$HEADERS` (the auth bearer string) being set.

```bash
# get a token for requests
eval $(node getToken.js)

#using the auth type jwt via the exposed api
curl -H $HEADERS "http://localhost:3001/accounts"

#or going through the gateway
curl --insecure -H $HEADERS "https://localhost/api/v1/accounts"
```

## Development

Export `TARGET=development`, preferably in `.env`.

To rebuild the example_server.

```bash
# defined as a function in ~/.zshrc
docker_find_container_name() {
  docker ps -a --filter "name=$1" --format "{{.Names}}"
}

docker-compose stop example_server; \
docker rm $(docker_find_container_name example_server); \
docker-compose up -d --build example_server
```

## Production

To run in production edit `docker-compose.yaml` and change the target for `example_proxy`
and `example_frontend` to `production`. Make sure to rebuild the containers.

```none
docker-compose build && docker-compose up
```
