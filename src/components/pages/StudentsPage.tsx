import * as React from "react";
import { Student } from "../../model/student"

interface StudentProps {
    students: Student[]
}

export const StudentsPage = (props: StudentProps) => {

    return (
        <div>
            <div>Students</div>
            {
                props.students.map(student => {
                    return <div key={student.id}> { student.name } </div>
                })
            }
        </div>

    )
}
