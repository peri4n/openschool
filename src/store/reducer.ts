import { StudentsCommand } from "./types"
import { AppState } from "./index"

const initialState: AppState = {
    students: []
}

const reducer = (
    state = initialState,
    action: StudentsCommand
): AppState => {
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
