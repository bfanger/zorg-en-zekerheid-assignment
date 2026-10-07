# Zorg en Zekerheid assignment

For details about the assignment see [docs/assignment.md](./docs/assignment.md)

## Local dev setup

```sh
npx -y pnpm@12 dev
```

Open http://localhost:5173/ in your browser.

## Design choices

Each step is split into its own component and form element, this makes it easier to reason about and make changes to a step.

For validation i'm using HTML5 form validation in combination with React Hook Form and Valibot. Valibot is a performant alternative to Zod.

SessionStorage is used for storing the intermediate state of the form, this prevents state from one tab affecting another tab and lets the user compare configurations.

I chose Next.js as starting point because it's part of the Zorg en Zekerheid tech stack, but the form doesn't benefit from SSR.

## Things I would change

- I'd load the data.json in a server component and handle the loading / error state via Next.js
- Move the naw step to be the last step of the flow for a better UX.
- I'd place all steps on one page, with naw as the last section.
- Also save the state periodically or when pressing the Back button.
- Make the form steps work without javascript.
