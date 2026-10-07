import * as v from "valibot";
import { stepSchema, type PersonalInfo, type Step } from "@/app/schemas";
import type { Plan } from "./useData";

const steps: Step[] = ["naw", "insurance", "addons"];
/**
 * Calculate the step based on desired step and form progress.
 */
export function maxStep(
  wanted: string | null,
  personalInfo?: PersonalInfo,
  plan?: Plan,
): Step {
  const step = v.parse(v.fallback(stepSchema, "naw"), wanted);
  let max: Step = "addons";
  if (!plan) {
    max = "insurance";
  } else if (!personalInfo) {
    max = "naw";
  }
  return steps.indexOf(step) <= steps.indexOf(max) ? step : max;
}
