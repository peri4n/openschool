import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {RootState} from "..";
import * as api from "../../api";
import {Teacher} from "../../model/Student";

interface TeachersState {
  entities: Teacher []
}

export const fetchTeachers = createAsyncThunk(
  "teachers/fetchTeachers",
  async (arg, {getState}) => {
    const state = (getState() as RootState).userInfo
    return await api.fetchTeachers(state.accessToken)
  }
);

const teachersSlice = createSlice({
  name: "teachers",
  initialState: {
    entities: [] as Teacher[],
  } as TeachersState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchTeachers.fulfilled, (state, action) => {
      state.entities = action.payload;
    });
  },
});

export default teachersSlice.reducer;
