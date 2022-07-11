import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SetUserInfo } from "./types";

interface UserInfoState {
  accessToken: string,
  refreshToken: string,
  firstName: string,
  lastName: string,
}

const initialState = {
    accessToken: "",
    refreshToken: "",
    firstName: "",
    lastName: "",
  } as UserInfoState

const userInfoSlice = createSlice({
  name: "userInfo",
  initialState,
  reducers: {
    setUserInfo(state, action: PayloadAction<SetUserInfo>) {
      state.firstName = action.payload.firstName
      state.lastName = action.payload.lastName
      state.accessToken = action.payload.accessToken
      state.refreshToken = action.payload.refreshToken
    }
  }
})

export const { setUserInfo } = userInfoSlice.actions

export default userInfoSlice.reducer;

export { getFirstName } from "./selectors"
