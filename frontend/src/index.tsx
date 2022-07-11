import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { store } from "./store";
import { App } from "./components/App";

import { initOptions, keycloak } from './keycloak'
import { ReactKeycloakProvider } from "@react-keycloak/web";
import { LinearProgress } from "@material-ui/core";
import { BrowserRouter as Router } from "react-router-dom";
import { setUserInfo } from "./store/userInfo";
import { fetchSystemInfo } from "./store/systemInfo";

const eventLogger = (event: string) => {
  switch (event) {
    case 'onAuthSuccess':
      keycloak.loadUserProfile().then(profile => {
        store.dispatch(setUserInfo({
          firstName: profile.firstName || "",
          lastName: profile.lastName || "",
          accessToken: keycloak.token || "",
          refreshToken: keycloak.refreshToken || ""
          }))
        store.dispatch(fetchSystemInfo())
      })
      break;
    default:
      break;
  }
}

const tokenLogger = (tokens: unknown) => {
  console.log('onKeycloakTokens', tokens)
}

ReactDOM.render(
  <React.StrictMode>
    <ReactKeycloakProvider
      initOptions={initOptions}
      authClient={keycloak}
      onEvent={eventLogger}
      onTokens={tokenLogger}
      LoadingComponent={<LinearProgress />}
    >
      <Provider store={store}>
        <Router>
          <App />
        </Router>
      </Provider>
    </ReactKeycloakProvider>
  </React.StrictMode >,
  document.getElementById("root")
);
