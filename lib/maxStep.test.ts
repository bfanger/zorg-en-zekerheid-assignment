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

describe("maxStep", () => {
  it("fall back to 'naw' for unknown step", () => {
    expect(maxStep("bogus")).toBe("naw");
    expect(maxStep(null, personalInfo, "basic")).toBe("naw");
  });

  it("returns the wanted step when there is full progress", () => {
    expect(maxStep("naw", personalInfo, "basic")).toBe("naw");
    expect(maxStep("insurance", personalInfo, "basic")).toBe("insurance");
    expect(maxStep("addons", personalInfo, "basic")).toBe("addons");
  });

  it("caps the step at 'insurance' when basic info is missing", () => {
    expect(maxStep("naw", personalInfo)).toBe("naw");
    expect(maxStep("insurance", personalInfo)).toBe("insurance");
    expect(maxStep("addons", personalInfo)).toBe("insurance");
  });

  it("caps the step at 'naw' when personal info is missing", () => {
    expect(maxStep("naw", undefined, "basic")).toBe("naw");
    expect(maxStep("insurance", undefined, "basic")).toBe("naw");
    expect(maxStep("addons", undefined, "basic")).toBe("naw");
  });
});
