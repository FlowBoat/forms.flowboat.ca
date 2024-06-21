import { google } from 'googleapis';
import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';
import { promisify } from 'util';

const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];

const getAuthClient = async () => {
  const keyPath = path.join(process.cwd(), '../../config/service-account.json');
  const content = await promisify(fs.readFile)(keyPath, 'utf8');
  const credentials = JSON.parse(content);

  const { client_email, private_key } = credentials;
  const auth = new google.auth.JWT(client_email, undefined, private_key, SCOPES);
  return auth;
};

const writeToSheet = async (auth: any, spreadsheetId: string, range: string, values: any[][]) => {
  const sheets = google.sheets({ version: 'v4', auth });
  const resource = {
    values,
  };
  const response = await sheets.spreadsheets.values.append({
    spreadsheetId,
    range,
    valueInputOption: 'RAW',
    resource,
  });
  return response.data;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const auth = await getAuthClient();
      const { spreadsheetId, range, values } = req.body;

      if (!spreadsheetId || !range || !values) {
        res.status(400).json({ message: 'Missing required parameters' });
        return;
      }

      const response = await writeToSheet(auth, spreadsheetId, range, [values]);

      res.status(200).json({ message: 'Data written successfully', response });
    } catch (error) {
      console.error('Error writing to sheet:', error);
      res.status(500).json({ message: 'Error writing to sheet', error });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
