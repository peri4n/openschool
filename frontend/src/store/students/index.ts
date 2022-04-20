import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as api from "../../api";
import { Student } from "../../model/Student";

interface StudentsState {
  entities: Student []
  loading: boolean
}

export const fetchStudents = createAsyncThunk(
  "students/fetchUsers",
  async (arg, thunkAPI) => {
    return await api.fetchStudents()
  }
);

const studentsSlice = createSlice({
  name: "students",
  initialState: {
    entities: [] as Student[],
    loading: true,
  } as StudentsState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchStudents.fulfilled, (state, action) => {
      state.entities = action.payload;
      state.loading = false;
    });

    builder.addCase(fetchStudents.rejected, (state, action) => {
      state.loading = true;
    });
  },
});

export default studentsSlice.reducer;