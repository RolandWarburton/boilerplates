# PG Docker Image Basic

![./uml.png](./uml.png)

```none
docker volume create example_data
docker network create example_net
docker-compose build && docker-compose up
```

Connect to the database.

```none
docker run -it --rm --network example_net postgres psql -h example_db -U example
```
