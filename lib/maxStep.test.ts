import { describe, expect, it } from "vitest";
import { maxStep } from "./maxStep";

const personalInfo = {
  firstname: "Anna",
  lastname: "Van der Berg",
  birthdate: "1990-01-01",
  email: "anna@example.com",
  street: "Main St 1",
  postcode: "1234AB",
  city: "Utrecht",
};

const plan = {
  id: "basis",
  name: "Basis",
  price: 145.45,
  description: "Essentiële ziektekosten dekking met maximale eigenrisico",
};

describe("maxStep", () => {
  it("fall back to 'naw' for unknown step", () => {
    expect(maxStep("bogus")).toBe("naw");
    expect(maxStep(null, personalInfo, plan)).toBe("naw");
  });

  it("returns the wanted step when there is full progress", () => {
    expect(maxStep("naw", personalInfo, plan)).toBe("naw");
    expect(maxStep("insurance", personalInfo, plan)).toBe("insurance");
    expect(maxStep("addons", personalInfo, plan)).toBe("addons");
  });

  it("caps the step at 'insurance' when basic info is missing", () => {
    expect(maxStep("naw", personalInfo)).toBe("naw");
    expect(maxStep("insurance", personalInfo)).toBe("insurance");
    expect(maxStep("addons", personalInfo)).toBe("insurance");
  });

  it("caps the step at 'naw' when personal info is missing", () => {
    expect(maxStep("naw", undefined, plan)).toBe("naw");
    expect(maxStep("insurance", undefined, plan)).toBe("naw");
    expect(maxStep("addons", undefined, plan)).toBe("naw");
  });
});
