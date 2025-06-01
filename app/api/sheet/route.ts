export const runtime = "edge";

import { NextRequest, NextResponse } from "next/server";

const clientEmail = process.env.GOOGLE_CLIENT_EMAIL;
const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n");

if (!clientEmail || !privateKey) {
  throw new Error("Missing Google client email or private key");
}

async function getAccessToken() {
  const header = {
    alg: "RS256",
    typ: "JWT"
  };
  const iat = Math.floor(Date.now() / 1000);
  const exp = iat + 3600;
  const payload = {
    iss: clientEmail,
    scope:
      "https://www.googleapis.com/auth/spreadsheets https://www.googleapis.com/auth/spreadsheets.readonly",
    aud: "https://oauth2.googleapis.com/token",
    exp,
    iat
  };
  function base64url(source: string) {
    return btoa(source)
      .replace(/=+$/, "")
      .replace(/\+/g, "-")
      .replace(/\//g, "_");
  }
  const enc = (obj: object) => base64url(JSON.stringify(obj));
  const unsignedToken = `${enc(header)}.${enc(payload)}`;
  const cryptoKey = await crypto.subtle.importKey(
    "pkcs8",
    str2ab(privateKey || ""),
    { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const signature = await crypto.subtle.sign(
    "RSASSA-PKCS1-v1_5",
    cryptoKey,
    new TextEncoder().encode(unsignedToken)
  );
  const signatureArray = new Uint8Array(signature);
  const signedToken = `${unsignedToken}.${base64url(
    String.fromCharCode(...Array.from(signatureArray))
  )}`;
  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: `grant_type=urn:ietf:params:oauth:grant-type:jwt-bearer&assertion=${signedToken}`
  });
  const data = await res.json();
  return data.access_token;
}

function str2ab(str: string) {
  const b64 = str
    .replace(/-----BEGIN PRIVATE KEY-----/, "")
    .replace(/-----END PRIVATE KEY-----/, "")
    .replace(/\n/g, "");
  const binary = atob(b64);
  const len = binary.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes.buffer;
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { spreadsheetId, range, ...data } = body;
  const values = Object.values(data);
  try {
    const accessToken = await getAccessToken();
    const res = await fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${encodeURIComponent(
        range
      )}:append?valueInputOption=RAW&insertDataOption=INSERT_ROWS`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ values: [values] })
      }
    );
    if (!res.ok) throw new Error("Error writing to sheet");
    return NextResponse.json({ message: "Data written successfully" });
  } catch (error) {
    return NextResponse.json(
      { message: "Error writing to sheet" },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const spreadsheetId = url.searchParams.get("spreadsheetId");
  const range = url.searchParams.get("range");
  if (!spreadsheetId || !range) {
    return NextResponse.json(
      { message: "Missing spreadsheetId or range" },
      { status: 400 }
    );
  }
  try {
    const accessToken = await getAccessToken();
    const res = await fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${encodeURIComponent(
        range
      )}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      }
    );
    if (!res.ok) throw new Error("Error reading from sheet");
    const data = await res.json();
    return NextResponse.json({ values: data.values });
  } catch (error) {
    return NextResponse.json(
      { message: "Error reading from sheet" },
      { status: 500 }
    );
  }
}
