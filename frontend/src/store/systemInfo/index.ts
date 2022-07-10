import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "..";
import * as api from "../../api";

interface SystemInfoState {
  schoolName: string,
}

export const fetchSystemInfo = createAsyncThunk(
  "systemInfo/fetchSystemInfo",
  async (arg, { getState }) => {
    const state = (getState() as RootState).userInfo
    return await api.fetchSystemInfo(state.token)
  }
);

const systemInfoSlice = createSlice({
  name: "systemInfo",
  initialState: {
    schoolName: "",
  } as SystemInfoState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchSystemInfo.fulfilled, (state, action) => {
      state.schoolName = action.payload;
    });
  },
});

export default systemInfoSlice.reducer;
