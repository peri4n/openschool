# Keycloak Setup

Because the software is not production ready anyway there is only a setup used for development.

## Starting Keycloak

To start Keycloak run

```
docker compose up Keycloak

```

This will start a keycloak sever with a realm and an example user already set up.
It expects a client listening on http://localhost:8000 . This port is set in the dev-server.

## Creating the example setup

To create an example setup with 100 students run:

```shell
npm run provision
```

