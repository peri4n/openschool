import KcAdminClient from "@keycloak/keycloak-admin-client";
import { rndSchool } from "./school";
import {
  student,
  STUDENT_GROUP,
  teacher,
  TEACHER_GROUP,
} from "./user"
import { User } from "./user"

const RealmName = "openschool";

export const STUDENT_ROLE = "student";
export const TEACHER_ROLE = "teacher";
export const ADMIN_ROLE = "admin";

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
      console.log(`Created user: ${u.id}`)
      return u
    } catch (error) {
      console.warn(`Failed to create user: ${user.email}`)
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
      console.error(`Failed to create client ${clientId}: ${error}`)
    }
  }

  async function createGroup(groupName: string) {
    try {
      const group = await kcAdminClient.groups.create({ name: groupName });
      console.log(`Created group ${groupName} with ID: ${group.id}`)
    } catch (error) {
      console.error(`Failed to create group ${groupName}: ${error}`)
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
      console.log(`Created role ${roleName} with name: ${response.id}`)
      return response.id
    } catch (error) {
      console.error(`Failed to create role ${roleName}: ${error}`)
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

  await createClient(`${RealmName}-frontend`);

  await createGroup(STUDENT_GROUP);
  await createGroup(TEACHER_GROUP);

  const studentRole = await createRole(STUDENT_ROLE, ["view-users", "view-realm"]);
  const teacherRole = await createRole(TEACHER_ROLE, ["manage-users"]);
  const adminRole = await createRole(ADMIN_ROLE, ["realm-admin"]);

  // Standard users
  const anna = student("anna", "anna", 10)
  const joe = teacher("joe", "joe", 40)
  await createUser(anna, STUDENT_ROLE, studentRole)
  await createUser(joe, TEACHER_ROLE, teacherRole)

  const school = rndSchool()

  school.classes.forEach(grade => {
    grade.forEach(async clazz => {
      await createGroup(clazz.name);

      const teacher = clazz.teacher
      await createUser(teacher, TEACHER_ROLE, teacherRole)

      const students = clazz.students
      students.forEach(async student => {
        await createUser(student, STUDENT_ROLE, studentRole)
      })

    })
  })
})();


