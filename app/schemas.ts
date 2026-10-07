import * as v from "valibot";

export type PersonalInfo = v.InferOutput<typeof personalInfoSchema>;
export const personalInfoSchema = v.object({
  firstname: v.pipe(v.string(), v.minLength(1)),
  lastname: v.pipe(v.string(), v.minLength(1)),
  birthdate: v.pipe(v.string(), v.isoDate()),
  email: v.pipe(v.string(), v.email()),
  street: v.pipe(v.string(), v.minLength(1)),
  postcode: v.pipe(
    v.string(),
    v.regex(
      /^[0-9]{4}\s?[A-Z]{2}$/,
      "Vul een geldige Nederlandse postcode in (bijv. 1234 AB)",
    ),
  ),
  city: v.pipe(v.string(), v.minLength(2)),
});

export type Step = v.InferOutput<typeof stepSchema>;
export const stepSchema = v.union([
  v.literal("naw"),
  v.literal("insurance"),
  v.literal("addons"),
]);
