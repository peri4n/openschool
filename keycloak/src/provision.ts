import KcAdminClient from "@keycloak/keycloak-admin-client";
import Chance from "chance";

// To configure the client, pass an object to override any of these  options:
// {
//   baseUrl: 'http://127.0.0.1:8080/auth',
//   realmName: 'master',
//   requestConfig: {
//     /* Axios request config options https://github.com/axios/axios#request-config */
//   },
// }

const RealmName = "openschool";

const TODAY = new Date(Date.now())

const SCHOOL_ENTRY_AGE = 6

const SCHOOL_EXIT_AGE = 19;

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

  await kcAdminClient.realms.create({
    enabled: true,
    realm: RealmName
  })

  // Override client configuration for all further requests:
  kcAdminClient.setConfig({
    realmName: RealmName
  });

  await kcAdminClient.clients.create({
    enabled: true,
    clientId: `${RealmName}-frontend`,
    rootUrl: "http://localhost:8000",
    redirectUris: ["http://localhost:8000/*"],
    adminUrl: "http://localhost:8000",
    webOrigins: ["http://localhost:8000"],
    protocol: "openid-connect",
  })

  const chance = new Chance();

  const students = await kcAdminClient.groups.create({
    name: "students"
  });
  console.log(`Created group students: ${students.id}`)

  const teachers = await kcAdminClient.groups.create({
    name: "teachers"
  });
  console.log(`Created group teachers: ${teachers.id}`)

  // Standard users
  const gender: "male" | "female" = (chance.gender() == "male") ? "male" : "female";
  await kcAdminClient.users.create({
    username: "anna@anna.com",
    email: "anna@anna.com",
    firstName: "Anna",
    lastName: "Baxx",
    emailVerified: true,
    enabled: true,
    groups: ["students"],
    credentials: [{
      type: "password",
      value: "anna"
    }],
    attributes: {
      gender: gender,
      birthday: chance.birthday({
        year: chance.year({
          max: TODAY.getFullYear() - SCHOOL_ENTRY_AGE,
          min: TODAY.getFullYear() - SCHOOL_EXIT_AGE,
        }),
      }),
      address: chance.address(),
      zip: chance.zip(),
      city: chance.city(),
      country: chance.country({ full: true }),
    }
  });

  // Students
  const number_of_students = 100

  for (let i = 0; i < number_of_students; i++) {
    const gender: "male" | "female" = (chance.gender() == "male") ? "male" : "female";
    const email = chance.email()
    const firstName = chance.first({ gender })

    const user = await kcAdminClient.users.create({
      username: email,
      email: email,
      firstName: firstName,
      lastName: chance.last(),
      emailVerified: true,
      enabled: true,
      groups: ["students"],
      credentials: [{
        type: "password",
        value: firstName
      }],
      attributes: {
        gender: gender,
        birthday: chance.birthday({
          year: chance.year({
            max: TODAY.getFullYear() - SCHOOL_ENTRY_AGE,
            min: TODAY.getFullYear() - SCHOOL_EXIT_AGE,
          }),
        }),
        address: chance.address(),
        zip: chance.zip(),
        city: chance.city(),
        country: chance.country({ full: true }),
      }
    });
    console.log(`Created user: ${user.id}`)
  }

  // Teacher
  const number_of_teachers = 50

  for (let i = 0; i < number_of_teachers; i++) {
    const gender: "male" | "female" = (chance.gender() == "male") ? "male" : "female";
    const email = chance.email()
    const firstName = chance.first({ gender })
    const teacher = await kcAdminClient.users.create({
      username: email,
      email: email,
      firstName: firstName,
      lastName: chance.last(),
      emailVerified: true,
      enabled: true,
      groups: ["teachers"],
      credentials: [{
        type: "password",
        value: firstName
      }],
      attributes: {
        gender: gender,
        birthday: chance.birthday({ type: 'adult' }),
        address: chance.address(),
        zip: chance.zip(),
        city: chance.city(),
        country: chance.country({ full: true }),
      }
    })
    console.log(`Created teacher: ${teacher.id}`)
  }
})();

