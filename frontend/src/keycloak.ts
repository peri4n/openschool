import Keycloak, { KeycloakInitOptions } from 'keycloak-js';

// Setup Keycloak instance as needed
// Pass initialization options as required or leave blank to load from 'keycloak.json'
export const keycloak = Keycloak({
  url: 'http://localhost:8088/auth',
  realm: 'openschool',
  clientId: 'openschool-frontend'
});

export const initOptions: KeycloakInitOptions = {
  onLoad: 'login-required'
}


