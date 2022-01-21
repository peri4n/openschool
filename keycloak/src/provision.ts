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

(async () => {
    const kcAdminClient = new KcAdminClient();


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
        clientId: `${ RealmName }-frontend`,
        rootUrl: "http://localhost:8000",
        redirectUris: ["http://localhost:8000/*"],
        adminUrl: "http://localhost:8000",
        webOrigins: ["http://localhost:8000"],
        protocol: "openid-connect"
    })

    const chance = new Chance();

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
            credentials: [{
                type: "password",
                value: firstName
            }]
        });
        console.log(`Created user: ${ user.id }`)
    }
})();

