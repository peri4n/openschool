import KcAdminClient from "@keycloak/keycloak-admin-client";
import { Student } from "../model/Student"

const kcAdminClient = new KcAdminClient({
    realmName: "openschool",
});

export async function fetchStudents() {
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

