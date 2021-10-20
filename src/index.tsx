import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux"
import { applyMiddleware, createStore } from "@reduxjs/toolkit"
import thunk from "redux-thunk"
import reducer from "./store/reducer"
import App from "./App"

const store = createStore(reducer, applyMiddleware(thunk))

ReactDOM.render(
    <React.StrictMode>
        <Provider store={ store }>
            <App />
        </Provider>
    </React.StrictMode>,
    document.getElementById("root"));
