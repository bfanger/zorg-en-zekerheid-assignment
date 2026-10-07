import * as v from "valibot";

export type PersonalInfo = v.InferOutput<typeof personalInfoSchema>;
export const personalInfoSchema = v.object({
  firstname: v.pipe(
    v.string(),
    v.minLength(1, "Voornaam is een verplicht veld"),
  ),
  lastname: v.pipe(
    v.string(),
    v.minLength(1, "Achternaam is een verplicht veld"),
  ),
  birthdate: v.pipe(v.string(), v.isoDate("Vul een geldige geboortedatum in")),
  email: v.pipe(v.string(), v.email("Vul een geldig e-mailadres in")),
  street: v.pipe(
    v.string(),
    v.minLength(1, "Straatnaam is een verplicht veld"),
  ),
  postcode: v.pipe(
    v.string(),
    v.regex(
      /^[0-9]{4}\s?[A-Z]{2}$/,
      "Vul een geldige postcode in (bijv. 1234 AB)",
    ),
  ),
  city: v.pipe(v.string(), v.minLength(2, "Stad is een verplicht veld")),
});

export type Step = v.InferOutput<typeof stepSchema>;
export const stepSchema = v.union([
  v.literal("naw"),
  v.literal("insurance"),
  v.literal("addons"),
]);
