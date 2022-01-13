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

To create a new example setup, login to Keycloak container (e.g. http://localhost:8080).
You can add users or change the security settings.
After you are done you can export the settings by running a parallel Docker container that exports the data.

```
docker exec -it openschool-keycloak-1 /opt/jboss/keycloak/bin/standalone.sh \
  -Djboss.socket.binding.port-offset=100 \
  -Dkeycloak.migration.action=export \
  -Dkeycloak.migration.provider=singleFile \
  -Dkeycloak.migration.realmName=openschool \
  -Dkeycloak.migration.usersExportStrategy=REALM_FILE \
  -Dkeycloak.migration.file=/tmp/export.json

```

Because `/tmp/export.json` is on the linked volume, the export will overwrite the staged `export.json` file.


