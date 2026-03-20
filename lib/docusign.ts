// lib/docusign.ts
import jwt from "jsonwebtoken";

// Use account-d for Demo/Developer, and account.docusign.com for Production
const OAUTH_BASE_PATH = "account-d.docusign.com";

export async function getDocusignAccessToken(): Promise<string> {
  const integrationKey = process.env.DOCUSIGN_INTEGRATION_KEY!;
  const userId = process.env.DOCUSIGN_USER_ID!;

  // Handle newline characters in the RSA key string from the .env file
  const privateKey = process.env.DOCUSIGN_PRIVATE_KEY!.replace(/\\n/g, "\n");

  const now = Math.floor(Date.now() / 1000);
  const expiresIn = 3600; // Token lives for 1 hour

  // 1. Construct the JWT Payload
  const jwtPayload = {
    iss: integrationKey,
    sub: userId,
    iat: now,
    exp: now + expiresIn,
    aud: OAUTH_BASE_PATH,
    scope: "signature impersonation",
  };

  // 2. Sign the JWT using your RSA Private Key
  const signedJwt = jwt.sign(jwtPayload, privateKey, { algorithm: "RS256" });

  // 3. Trade the signed JWT for a usable Access Token
  const response = await fetch(`https://${OAUTH_BASE_PATH}/oauth/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion: signedJwt,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    console.error("DocuSign JWT Auth Error:", data);
    throw new Error(
      `DocuSign Auth Failed: ${data.error_description || data.error}`,
    );
  }

  return data.access_token;
}
