const { default: axios } = require("axios");
const OpenIdClient = require("openid-client");

const identityUrl =
  "http://localhost/SuiteCRM-8.0.3/public/legacy/Api/access_token";
const clientId = "4d762240-3704-bc5b-e737-61f856901896";
const clientSecret = "test";
const credentialsScope = "platformapiaccess";

async function GetAccessToken() {
  var issuer = await OpenIdClient.Issuer.discover(identityUrl);

  const client = new issuer.Client({
    client_id: clientId,
    client_secret: clientSecret,
  });

  const grantResponse = await client.grant({
    grant_type: "client_credentials",
    scope: credentialsScope,
  });

  const accessToken = grantResponse.access_token;
  console.log(accessToken);
}

async function getJWTToken() {
  const token = await axios.post(`${process.env.SUITE_CRM}/access_token`, {
    grant_type: process.env.SUITE_CRM_GRANT_TYPE,
    client_id: process.env.SUITE_CRM_CLIENT_ID,
    client_secret: process.env.SUITE_CRM_CLIENT_SECRET,
  });
  return token.data.access_token;
}

module.exports = getJWTToken;
