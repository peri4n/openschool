import * as React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from "react-router-dom";
import { Layout } from "./layout/Layout";
import { TeachersPage } from "./pages/TeachersPage";
import { StudentsPage } from "./pages/StudentsPage";
import { HomePage } from "./pages/HomePage";
import { useKeycloak } from "@react-keycloak/web";

export const App = () => {

  const { keycloak, initialized } = useKeycloak()
  console.log("Initialized: " + initialized)

  return (
    <Router>
      <Layout>
        <Switch>
          <Route exact path="/teacher">
            <TeachersPage />
          </Route>
          <Route exact path="/students">
            <StudentsPage />
          </Route>
          <Route exact path="/">
            <HomePage />
          </Route>
        </Switch>
      </Layout>
    </Router>
  );
};
