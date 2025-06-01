# How to edit the dynamic forms app

This app is designed for easy DX, so that devs can add and customize new forms just using JSON.

## To make a new form
* Make a new folder in `/app/(data)/<year>` (ie. `/app/(data)/2024`).
* Add your form's name with a tsx file (ie. `/app/(data)/2024/MemberApplication.tsx`). This will be your form JSON.
* Import the `Form` class from `@/form`.
* Initialize the class and export it. See the `@/form.ts` file to see the methods and how to set them up.
* Add that folder to the `index.ts` export in `/app/(data)/index.ts`.
* Add it to the `forms` array.
* That's it

When adding a form, make sure that it's shared with editing priviledges to the Google Cloud Account that you're using. For Flowboat it's sheets-api@flowboat-forms.iam.gserviceaccount.com. Don't share this with anyone.