import { NextRequest, NextResponse } from 'next/server';
import { google } from 'googleapis';

const keyFilePath = process.env.GOOGLE_SERVICE_ACCOUNT_KEY_PATH;

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { spreadsheetId, range, ...data } = body;

  const values = Object.values(data);

  try {
    // Authenticate with the Google Sheets API-
    const auth = new google.auth.GoogleAuth({
      keyFile: keyFilePath, // Use environment variable
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const authClient = await auth.getClient();
    // Append data to the Google Sheet
    await google.sheets('v4').spreadsheets.values.append({
      auth: authClient,
      spreadsheetId,
      range,
      valueInputOption: 'RAW',
      insertDataOption: 'INSERT_ROWS', // Ensure new rows are appended
      requestBody: {
        values: [values],
      },
    });

    return NextResponse.json({ message: 'Data written successfully' });
  } catch (error) {
    console.error('Error writing to sheet:', error);
    return NextResponse.json({ message: 'Error writing to sheet' }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const spreadsheetId = url.searchParams.get('spreadsheetId');
  const range = url.searchParams.get('range');

  if (!spreadsheetId || !range) {
    return NextResponse.json({ message: 'Missing spreadsheetId or range' }, { status: 400 });
  }

  try {
    // Authenticate with the Google Sheets API
    const auth = new google.auth.GoogleAuth({
      keyFile: keyFilePath, // Use environment variable
      scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
    });

    const authClient = await auth.getClient();

    // Retrieve data from the Google Sheet
    const response = await google.sheets('v4').spreadsheets.values.get({
      auth: authClient,
      spreadsheetId,
      range,
    });

    return NextResponse.json({ values: response.data.values });
  } catch (error) {
    console.error('Error reading from sheet:', error);
    return NextResponse.json({ message: 'Error reading from sheet' }, { status: 500 });
  }
}