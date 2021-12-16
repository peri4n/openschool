import * as React from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import { Layout } from "./Layout";
import { TeachersPage } from "./pages/TeachersPage";
import { StudentsPage } from "./pages/StudentsPage";

// @ts-ignore
export const App = (props) => {
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
          <Redirect to="/teacher" />
        </Switch>
      </Layout>
    </Router>
  );
};
