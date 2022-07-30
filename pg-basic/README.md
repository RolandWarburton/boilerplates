# PG Docker Image Basic

```none
docker volume create postgres
docker network create pg_net
docker-compose build && docker-compose up
sudo -u postgres psql -h localhost -p 5432 -d testdb -U admin --password
```
