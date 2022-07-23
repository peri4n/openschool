import KcAdminClient from "@keycloak/keycloak-admin-client";
import {
  STUDENT_GROUP,
  TEACHER_GROUP,
  User,
  student,
  studentR,
  teacherR,
  TEACHER_ROLE,
  STUDENT_ROLE,
  ADMIN_ROLE
} from "./domain"
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

  async function createUser(user: User, roleName: string, roleId: string): Promise<{ id: string }> {
    try {
      const u = await kcAdminClient.users.create(user);
      await kcAdminClient.users.addRealmRoleMappings({ id: u.id, roles: [{ name: roleName, id: roleId }] })
      console.log(`Created user: ${ u.id }`)
      return u
    } catch (error) {
      console.warn(`Failed to create user: ${ user.email }`)
    }
  }

  async function createClient(clientId: string) {
    try {
      await kcAdminClient.clients.create({
        enabled: true,
        clientId: clientId,
        rootUrl: "http://localhost:8000",
        redirectUris: ["http://localhost:8000/*"],
        adminUrl: "http://localhost:8000",
        webOrigins: ["http://localhost:8000"],
        protocol: "openid-connect",
      })
      console.log("Created the client")
    } catch (error) {
      console.error(`Failed to create client ${ clientId }: ${ error }`)
    }
  }

  async function createGroup(groupName: string) {
    try {
      const group = await kcAdminClient.groups.create({ name: groupName });
      console.log(`Created group ${ groupName } with ID: ${ group.id }`)
    } catch (error) {
      console.error(`Failed to create group ${ groupName }: ${ error }`)
    }
  }

  async function createRole(roleName: string, managementRoles: string[]): Promise<string> {
    try {
      await kcAdminClient.roles.create({
        name: roleName,
        composite: true,
        composites: {
          client: {
            "realm-management": managementRoles
          }
        }
      });
      const response = await kcAdminClient.roles.findOneByName({ name: roleName })
      console.log(`Created role ${ roleName } with name: ${ response.id }`)
      return response.id
    } catch (error) {
      console.error(`Failed to create role ${ roleName }: ${ error }`)
    }
  }

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

  await createClient(`${ RealmName }-frontend`);

  await createGroup(STUDENT_GROUP);
  await createGroup(TEACHER_GROUP);

  const studentRole = await createRole(STUDENT_ROLE, ["view-users", "view-realm"]);
  const teacherRole = await createRole(TEACHER_ROLE, ["manage-users"]);
  await createRole(ADMIN_ROLE, ["realm-admin"]);

  // Standard users
  const anna = student("anna", "anna", chance)
  const joe = student("joe", "joe", chance)

  await createUser(anna, STUDENT_ROLE, studentRole)
  await createUser(joe, STUDENT_ROLE, studentRole)

  // Students
  const number_of_students = 100
  for (let i = 0; i < number_of_students; i++) {
    await createUser(studentR(chance), STUDENT_ROLE, studentRole)
  }

  // Teacher
  const number_of_teachers = 50
  for (let i = 0; i < number_of_teachers; i++) {
    await createUser(teacherR(chance), TEACHER_ROLE, teacherRole)
  }
})();


