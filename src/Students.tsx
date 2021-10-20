import * as React from "react";
import { Dispatch } from "@reduxjs/toolkit"
import { useDispatch } from "react-redux"
import { fetchStudents } from "./store/actions"
import { Student } from "./store/reducer"
import { useEffect } from "react"

interface StudentProps {
    students: Student[]
}

export const Students = (props: StudentProps) => {

    const dispatch: Dispatch<any> = useDispatch();

    useEffect(() => {
        dispatch(fetchStudents)
    }, [])

    return (
        <div>
            <div>Students</div>
            {
                props.students.map(student => {
                    return <div> { student.name } </div>
                })
            }
        </div>

    )
}
