import * as React from "react";
import { useEffect } from "react";
import { fetchStudents } from "../../store/students"
import { useAppDispatch, useAppSelector } from "../../store"
import { LinearProgress } from "@material-ui/core"

export const StudentsPage = () => {

    const dispatch = useAppDispatch();

    const state = useAppSelector(state => state)

    useEffect(() => {
        dispatch(fetchStudents())
    }, [])

    return (
        <div>
            <div>{ state.loading && <LinearProgress /> }</div>
            {
                // @ts-ignore
                state.entities.map(student => {
                    return <div key={ student.id }> { student.name } </div>
                })
            }
        </div>

    )
}
