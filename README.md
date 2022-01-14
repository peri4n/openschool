# Open school

OpenSchool is a project I started to learn about React and Redux at a production scale.
As time goes by, maybe it grows to something bigger.

## Architexture

OpenSchool is a React Single Page Application. 
To manage its users, it uses [Keycloak](https://keycloak.org).
To mimic a REST backend, it uses [Json-Server](https://github.com/typicode/json-server).

Both of these services as well as the webserver serving the application are managed via Docker-Compose.

## Development

You first have to start the two services OpenSchool depends on. 
Both services come already enriched with example data.
As everything is set up using Docker-Compose you can start these by running:

```sh
docker-compose --profile dev up
```

Now you can start the development server by running:

```sh
npm run serve
```
