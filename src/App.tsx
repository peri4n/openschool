import * as React from "react";
import { Teacher } from "./Teacher"
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom"
import { Students } from "./Students"
import { Layout } from "./Layout"

export const App = () => {
    return (
        <Router>
            <Layout>
                <Switch>
                    <Route exact path="/teacher"><Teacher /></Route>
                    <Route exact path="/students"><Students /></Route>
                    <Redirect to="/teacher" />
                </Switch>
            </Layout>
        </Router>
    )
}
