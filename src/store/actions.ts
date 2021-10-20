import * as api from "../api"
import { ActionCreator } from "@reduxjs/toolkit"
import { FetchStudentsFailed, FetchStudentsStarted, FetchStudentsSucceeded } from "./types"
import { Student } from "./reducer"

const fetchStudentsStarted: ActionCreator<FetchStudentsStarted> = () => {
    return {
        type: "FETCH_STUDENTS_STARTED"
    }
}

const fetchStudentsSucceeded: ActionCreator<FetchStudentsSucceeded> = (students: Student[]) => {
    return {
        type: "FETCH_STUDENTS_SUCCEEDED",
        payload: { students }
    }
}

const fetchStudentsFailed: ActionCreator<FetchStudentsFailed> = () => {
    return {
        type: "FETCH_STUDENTS_FAILED"
    }
}

// @ts-ignore
export const fetchStudents = (dispatch) => {
    dispatch(fetchStudentsStarted())

    return api.fetchStudents()
        .then(resp => {
            // @ts-ignore
            const students = resp.data
            dispatch(fetchStudentsSucceeded(students))
        }).catch(err => {
            dispatch(fetchStudentsFailed())
            console.log(`Something went wrong: ${ err }`)
        })
}
