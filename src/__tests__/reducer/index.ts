import reducer, { fetchStudents } from "../../store/students"
import { configureStore } from "@reduxjs/toolkit"
import studentsReducer from "../../store/students"

describe("Students reducer", () => {

    it("should return the initial state", () => {
        expect(reducer(undefined, { type: "ignore" })).toEqual({
            entities: [],
            loading: "idle"
        })
    })

    it("should add students", async () => {
        const store = configureStore({
            reducer: studentsReducer,
        })

        await store.dispatch(fetchStudents())
    })
})
