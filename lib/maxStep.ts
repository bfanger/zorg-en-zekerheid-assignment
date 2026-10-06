import * as v from "valibot";
import { stepSchema, type PersonalInfo, type Step } from "@/app/schemas";

const steps: Step[] = ["naw", "insurance", "addons"];
/**
 * Calculate the step based on desired step and form progress.
 */
export function maxStep(
  wanted: string | null,
  personalInfo?: PersonalInfo,
  basic?: string,
): Step {
  const step = v.parse(stepSchema, wanted);
  let max: Step = "addons";
  if (!basic) {
    max = "insurance";
  } else if (!personalInfo) {
    max = "naw";
  }
  return steps.indexOf(step) <= steps.indexOf(max) ? step : max;
}
