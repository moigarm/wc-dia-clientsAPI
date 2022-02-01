const OpenIdClient = require("openid-client");

const identityUrl = "https://db08-208-96-134-41.ngrok.io/SuiteCRM-8.0.3/public/legacy/Api/access_token";
const clientId = "4d762240-3704-bc5b-e737-61f856901896";
const clientSecret = "test";
const credentialsScope = "platformapiaccess";

async function GetAccessToken() {
    var issuer = await OpenIdClient.Issuer.discover(identityUrl);

    const client = new issuer.Client({
        client_id: clientId,
        client_secret: clientSecret
    });

    const grantResponse = await client.grant({
        grant_type: 'client_credentials',
        scope: credentialsScope,
    });

    const accessToken = grantResponse.access_token
}

module.exports =[
    GetAccessToken
]