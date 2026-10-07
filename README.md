# Zorg en Zekerheid assignment

For details about the assignment see [docs/assignment.md](./docs/assignment.md)

## Local dev setup

```sh
npx -y pnpm@12 dev
```

Open http://localhost:5173/ in your browser.

## Design choices

Chose Next.js because that is part of the Zorg en Zekerheid tech stack.

Valibot for validating the session data, this prevent version conflicts or manipulation via devtools

sessionStorage for storing the intermediate state of the form, this prevent state from one tab to affect another tab and lets the user compare configurations.

Split each step into its own component and form element, this makes it easier to reason about and test.

## Things I would change

- I'd load the data.json in a server component and handle the loading / error state via Next.js
- Move the naw step as the last step of the flow for a better UX.
- I'd place all steps onto one page, naw as the last section.
- Also save the state periodically or when pressing the Back button
