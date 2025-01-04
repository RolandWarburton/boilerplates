# PG Docker Image Basic

![./uml.png](./uml.png)

```none
docker volume create example_data
docker network create example_net
docker-compose build && docker-compose up
```

By default Adminer can be found at [localhost:8080](http://localhost:8080).

See `init.sql` for the following details.

* server: example_db
* username: example
* password: see `init.sql`
* database: example

Connect to the database.

```none
docker exec -it example_db psql -h example_db -U example
```
