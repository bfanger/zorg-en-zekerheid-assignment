import { object, string, type InferOutput } from "valibot";

export const personalInfoSchema = object({
  firstName: string(),
  lastName: string(),
  birthDate: string(),
  email: string(),
  street: string(),
  postcode: string(),
  city: string(),
});

export type PersonalInfo = InferOutput<typeof personalInfoSchema>;
