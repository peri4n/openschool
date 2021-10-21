import { applyMiddleware, createStore } from "@reduxjs/toolkit"
import reducer from "./reducer"
import thunk from "redux-thunk"
import { Student } from "../model/student"

export interface AppState {
    students: Student[]
}

export const store = createStore(reducer, applyMiddleware(thunk))
