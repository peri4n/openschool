import { Student } from "../model/Student"
import axios from "axios";

const backendClient = axios.create({
  baseURL: "http://localhost:8080"
})

export async function fetchStudents(token: string): Promise<Student[]> {
  return backendClient
    .get("/users", {
      headers: {
        'Authorization': `bearer ${token}`
      }
    })
    .then(resp => resp.data.students)
}

type FetchSystemInfoResponse = { schoolName: string }

export async function fetchSystemInfo(token: string): Promise<string> {
  return backendClient
    .get<FetchSystemInfoResponse>("/info", {
      headers: {
        'Authorization': `bearer ${token}`
      }
    })
    .then(resp => resp.data.schoolName)
}

export async function fetchUserInfo(): Promise<string> {
  return backendClient
    .get<FetchSystemInfoResponse>("/info")
    .then(resp => resp.data.schoolName)
}
