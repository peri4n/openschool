import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {RootState} from "..";
import * as api from "../../api";
import {Student} from "../../model/Student";

interface StudentsState {
  entities: Student []
}

export const fetchStudents = createAsyncThunk(
  "students/fetchStudents",
  async (arg, {getState}) => {
    const state = (getState() as RootState).userInfo
    return await api.fetchStudents(state.accessToken)
  }
);

const studentsSlice = createSlice({
  name: "students",
  initialState: {
    entities: [] as Student[]
  } as StudentsState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchStudents.fulfilled, (state, action) => {
      state.entities = action.payload;
    });
  },
});

export default studentsSlice.reducer;
