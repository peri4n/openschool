import KcAdminClient from "@keycloak/keycloak-admin-client";
import { Student } from "../model/Student"
import axios from "axios";

const backendClient = axios.create({
  baseURL: "http://localhost:8080"
})

const kcAdminClient = new KcAdminClient({
  baseUrl: "http://localhost:8088/auth",
  realmName: "openschool",
});

export async function fetchStudents(): Promise<Student[]> {
  // Authorize with username / password
  await kcAdminClient.auth({
    username: "cafabko@gabueha.ee",
    password: "Rachel",
    grantType: "password",
    clientId: "openschool-frontend"
  });

  const users = await kcAdminClient.users.find()
  return users.map(user => {
    return new Student(user.id, user.firstName, user.lastName)
  })
}
 
type FetchSystemInfoResponse = { schoolName: string }

export async function fetchSystemInfo(): Promise<string> {
  return backendClient
    .get<FetchSystemInfoResponse>("/info")
    .then(resp => resp.data.schoolName)
}

export async function fetchUserInfo(): Promise<string> {
  return backendClient
    .get<FetchSystemInfoResponse>("/info")
    .then(resp => resp.data.schoolName)
}
