import KcAdminClient from "@keycloak/keycloak-admin-client";
import { STUDENT_GROUP, TEACHER_GROUP, User, student, studentR, teacherR } from "./domain"
import Chance from "chance";

const chance = new Chance();

const RealmName = "openschool";

(async () => {
  const kcAdminClient = new KcAdminClient({
    baseUrl: 'http://127.0.0.1:8088/auth',
  });

  // Authorize with username / password
  await kcAdminClient.auth({
    username: "admin",
    password: "admin",
    grantType: "password",
    clientId: "admin-cli",
  });

  try {
    await kcAdminClient.realms.create({
      enabled: true,
      realm: RealmName
    })
    console.log("Created the realm")
  } catch (error) {
    console.error("Failed to create the realm")
  }

  // Override client configuration for all further requests:
  kcAdminClient.setConfig({
    realmName: RealmName
  });

  try {
    await kcAdminClient.clients.create({
      enabled: true,
      clientId: `${RealmName}-frontend`,
      rootUrl: "http://localhost:8000",
      redirectUris: ["http://localhost:8000/*"],
      adminUrl: "http://localhost:8000",
      webOrigins: ["http://localhost:8000"],
      protocol: "openid-connect",
    })
    console.log("Created the client")
  } catch (error) {
    console.error("Failed to create the client")
  }

  try {
    const students = await kcAdminClient.groups.create({ name: STUDENT_GROUP });
    console.log(`Created group students: ${students.id}`)

    const teachers = await kcAdminClient.groups.create({ name: TEACHER_GROUP });
    console.log(`Created group teachers: ${teachers.id}`)
  } catch (error) {
    console.error("Failed to create the groups")
  }

  async function createUser(user: User): Promise<{ id: string }> {
    try {
      const u = await kcAdminClient.users.create(user);
      console.log(`Created user: ${u.id}`)
      return u
    } catch (error) {
      console.warn(`Failed to create user: ${user.email}`)
    }
  }

  // Standard users
  const anna = student("anna", "anna", chance)
  const joe = student("joe", "joe", chance)
  await createUser(anna)
  await createUser(joe)

  // Students
  const number_of_students = 100
  for (let i = 0; i < number_of_students; i++) {
    createUser(studentR(chance))
  }

  // Teacher
  const number_of_teachers = 50
  for (let i = 0; i < number_of_teachers; i++) {
    createUser(teacherR(chance))
  }
})();

