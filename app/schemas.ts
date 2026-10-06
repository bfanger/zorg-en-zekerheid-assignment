import {
  fallback,
  literal,
  object,
  string,
  union,
  type InferOutput,
} from "valibot";

export type PersonalInfo = InferOutput<typeof personalInfoSchema>;
export const personalInfoSchema = object({
  firstname: string(),
  lastname: string(),
  birthdate: string(),
  email: string(),
  street: string(),
  postcode: string(),
  city: string(),
});

export type Step = InferOutput<typeof stepSchema>;
export const stepSchema = fallback(
  union([literal("naw"), literal("insurance"), literal("addons")]),
  "naw",
);
