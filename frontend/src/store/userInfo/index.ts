import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SetUserInfo } from "./types";

interface UserInfoState {
  token: string,
  firstName: string,
  lastName: string,
}

const initialState = {
    token: "",
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
      state.token = action.payload.token
    }
  }
})

export const { setUserInfo } = userInfoSlice.actions

export default userInfoSlice.reducer;

export { getFirstName } from "./selectors"
