# ratings-management
Example for microservices with AngularJS, NodeJS and SpringBoot

This is a docker-compose application that builds containers for some API's on NodeJS and SpringBoot,and these microservices persist their individual data in MongoDB. 

All microservices (backend and frontend) are accesible through a reverse proxy with Traefik. 

It is just necessary to execute the following command with sudo privileges 

```
docker-compose up
```

-Frontend

- frontend.localhost/ratings



-Backend

- backend.localhost/users
- backend.localhost/location
- backend.localhost/purchases 
- backend.localhost/stores
- backend.localhost/ratings
