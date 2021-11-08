import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import * as api from "../api"
import { Student } from "../model/student"

export const fetchStudents = createAsyncThunk(
    "students/fetchUsers",
    async (arg, thunkAPI) => {
        const response = await api.fetchStudents()
        return response.data
    }
)

const studentsSlice = createSlice({
    name: "students",
    initialState: {
        entities: [] as Student[],
        loading: "idle"
    },
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(fetchStudents.fulfilled, (state, action) => {
            // @ts-ignore
            state.entities = action.payload
            state.loading = "done"
        })

        builder.addCase(fetchStudents.rejected, (state, action) => {
            // @ts-ignore
            state.loading = "error"
        })
    }
})

export default studentsSlice.reducer
