import * as React from "react";
import { Teacher } from "./Teacher"
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom"
import { Students } from "./Students"
import { Layout } from "./Layout"
import { connect } from "react-redux"
import { State } from "./store/reducer"

// @ts-ignore
const App = (props) => {
    return (
        <Router>
            <Layout>
                <Switch>
                    <Route exact path="/teacher"><Teacher /></Route>
                    <Route exact path="/students"><Students students={ props.students } /></Route>
                    <Redirect to="/teacher" />
                </Switch>
            </Layout>
        </Router>
    )
}

function mapStateToProps(state: State) {
    return state
}

export default connect(mapStateToProps)(App)
