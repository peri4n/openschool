[![Java CI with Gradle](https://github.com/peri4n/openschool/actions/workflows/gradle.yml/badge.svg)](https://github.com/peri4n/openschool/actions/workflows/gradle.yml)
[![NodeJS with Webpack](https://github.com/peri4n/openschool/actions/workflows/webpack.yml/badge.svg)](https://github.com/peri4n/openschool/actions/workflows/webpack.yml)

# Open school

OpenSchool is a school management app. It tries to be a platform for every activity in school.

## Start the application

```sh
docker-compose up
```

## Architecture

OpenSchool is a React Single Page Application. 
To manage its users, it uses [Keycloak](https://keycloak.org).

All services are managed via Docker-Compose.

## Development

### Frontend

If you want to develop in the frontend you can start the backend via:

```sh
docker-compose --profile backend up
```

Now you can start your development server

```sh
npm run serve
```

### Backend

If you want to develop in the backend you can start the frontend via:

```sh
docker-compose --profile frontend up
```

## Motivation

OpenSchool is a project I started to learn about React and Redux at a production scale.
As time goes by, maybe it grows to something bigger.
