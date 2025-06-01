# forms.flowboat.ca

See `docs.md` for instructions on how to use the dynamic forms feature.

This is a forms site for Flowboat. It's built with Next.js, Radix, Tailwind, and the Google Cloud API. I use pnpm, but this setup should work with npm as well.

## Setup

1. Clone the repo: `git clone https://github.com/jeffrey-zang/forms.flowboat.ca.git`.
2. Install the dependencies by running `npm install`.
3. Start the development server with `npm run dev`.

## Credentials

Create a `.env.local` and copy everything from `.env.template` into it. Then, make a Google Cloud Service Account with access to the Sheets API, and copy in all of the details. Reach out to me (hi@jeffz.dev) if you're working on this app once I'm no longer with the team, and I can give you the creds for my GC Service Account and Sheet id.

## Deployment

I've deployed this on the Flowboat CloudFlare account. Prod env vars are managed there.
