import { object, string, type InferOutput } from "valibot";

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
