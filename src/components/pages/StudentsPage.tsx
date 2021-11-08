import * as React from "react";
import { useEffect } from "react";
import { fetchStudents } from "../../store/students"
import { useAppDispatch, useAppSelector } from "../../store"

export const StudentsPage = () => {

    const dispatch = useAppDispatch();

    const state = useAppSelector(state => state)

    useEffect(() => {
        dispatch(fetchStudents())
    }, [])

    function toHeader(loading: string) {
        switch (loading) {
            case "idle": return "Fetching users";
            case "error": return "Error while fetching users";
            case "done": return "Students";
        }

    }

    return (
        <div>
            <div>{// @ts-ignore
                toHeader(state.loading)}</div>
            {
                // @ts-ignore
                state.entities.map(student => {
                    return <div key={student.id}> { student.name } </div>
                })
            }
        </div>

    )
}
