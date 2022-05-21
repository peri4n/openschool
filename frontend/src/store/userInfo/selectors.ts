import { createSelector } from "reselect";
import { RootState } from "..";

const getUserInfo = (state: RootState) => state.userInfo

export const getFirstName = createSelector(getUserInfo, userInfo => userInfo.firstName)

