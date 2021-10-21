import * as React from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom"
import { Layout } from "./Layout"
import { connect, useDispatch } from "react-redux"
import { AppState } from "../store"
import { TeachersPage } from "./pages/TeachersPage";
import { StudentsPage } from "./pages/StudentsPage";
import { Dispatch } from "@reduxjs/toolkit"
import { useEffect } from "react"
import { fetchStudents } from "../store/actions"

// @ts-ignore
const App = (props) => {

    const dispatch: Dispatch<any> = useDispatch();

    useEffect(() => {
        dispatch(fetchStudents)
    }, [])

    return (
        <Router>
            <Layout>
                <Switch>
                    <Route exact path="/teacher"><TeachersPage /></Route>
                    <Route exact path="/students"><StudentsPage students={ props.students } /></Route>
                    <Redirect to="/teacher" />
                </Switch>
            </Layout>
        </Router>
    )
}

function mapStateToProps(state: AppState) {
    return state
}

export default connect(mapStateToProps)(App)
