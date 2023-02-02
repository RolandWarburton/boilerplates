# PG Docker Image Basic

![./uml.png](./uml.png)

```none
docker volume create assets_data
docker network create assets_net
docker-compose build && docker-compose up
```

Connect to the database.

```none
docker run -it --rm --network assets_net postgres psql -h assets_db -U assets
```
