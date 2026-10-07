import { test, expect } from "@playwright/test";

test("Sign up flow", async ({ page }) => {
  await page.goto("/");

  await test.step("Step 1: fill in naw form", async () => {
    await page.getByRole("textbox", { name: "Voornaam" }).fill("Jan");
    await page.getByRole("textbox", { name: "Achternaam" }).fill("Jansen");
    await page
      .getByRole("textbox", { name: "Geboortedatum" })
      .fill("1990-01-01");
    await page
      .getByRole("textbox", { name: "E-mailadres" })
      .fill("jan@example.com");
    await page.getByRole("textbox", { name: "Straat" }).fill("Straat 1");
    await page.getByRole("textbox", { name: "Postcode" }).fill("1234AB");
    await page.getByRole("textbox", { name: "Stad" }).fill("Den Haag");

    await page.getByRole("button", { name: "Volgende stap" }).click();
  });

  await test.step("Restore the session when page is reloaded", async () => {
    await expect(page.getByRole("textbox", { name: "Voornaam" })).toHaveValue(
      "Jan",
    );
    await expect(
      page.getByRole("textbox", { name: "E-mailadres" }),
    ).toHaveValue("jan@example.com");
  });

  await test.step("Step 2: select plan", async () => {
    await page.getByRole("radio", { name: /Standaard/ }).check();
    await page.getByRole("button", { name: "Volgende stap" }).click();
  });

  await test.step("Step 3: select addons", async () => {
    await page.getByRole("checkbox", { name: /Tandarts/ }).check();
    await page.getByRole("checkbox", { name: /Reizen/ }).check();
    await page.getByRole("button", { name: "Voltooien" }).click();
  });

  await test.step("Thanks you page", async () => {
    await expect(page.getByRole("heading", { name: /Bedankt/ })).toBeVisible();
  });
});
