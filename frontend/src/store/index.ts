import {combineReducers, configureStore} from "@reduxjs/toolkit"
import studentsReducer from "./students/"
import systemInfoReducer from "./systemInfo"
import userInfoReducer from "./userInfo"
import teachersReducer from "./teachers"
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux"

export const store = configureStore({
  reducer: combineReducers({
    students: studentsReducer,
    teachers: teachersReducer,
    systemInfo: systemInfoReducer,
    userInfo: userInfoReducer
  }),
  devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
