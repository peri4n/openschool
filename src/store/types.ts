import { Action } from "@reduxjs/toolkit"
import { Student } from "../model/student"

export type StudentsCommand = FetchStudentsStarted | FetchStudentsSucceeded | FetchStudentsFailed

export interface FetchStudentsStarted extends Action {
    type: "FETCH_STUDENTS_STARTED"
}

export interface FetchStudentsSucceeded extends Action {
    type: "FETCH_STUDENTS_SUCCEEDED",
    payload: {
        students: Student[]
    }
}

export interface FetchStudentsFailed extends Action {
    type: "FETCH_STUDENTS_FAILED"
}
