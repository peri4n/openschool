import { Student } from "../model/Student"
import axios from "axios";
import KcAdminClient from '@keycloak/keycloak-admin-client';

const backendClient = axios.create({
  baseURL: "http://localhost:8080"
})


function createKeycloakClient(accessToken: string) {
  const kcAdminClient = new KcAdminClient({
    realmName: "openschool",
    baseUrl: "http://localhost:8088/auth",
  });

  kcAdminClient.setAccessToken(accessToken)
  return kcAdminClient
}

export async function fetchStudents(token: string): Promise<Student[]> {
  const resp = await createKeycloakClient(token).users.find()
  return resp.map(userRep => ({
    id: userRep.id,
    first: userRep.firstName,
    last: userRep.lastName
  }))
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
