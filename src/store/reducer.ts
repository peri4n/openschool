import { StudentsCommand } from "./types"

export interface State {
    students: Student[]
}

export interface Student {
    id: number
    name: string
}

const initialState: State = {
    students: []
}

const reducer = (
    state = initialState,
    action: StudentsCommand
): State => {
    switch (action.type) {
        case "FETCH_STUDENTS_SUCCEEDED":
            return {
                ...state,
                students: action.payload.students
            }
        default:
            return state;
    }
}

export default reducer;
