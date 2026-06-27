import { classifySeverity } from "./severity";

describe("classifySeverity", () => {
  test("detects CRITICAL keyword", () => {
    expect(classifySeverity("JEE Main Result Declared")).toBe("CRITICAL");
  });

  test("case-insensitive match", () => {
    expect(classifySeverity("ADMIT CARD released")).toBe("CRITICAL");
  });

  test("multi-word keyword matches as phrase", () => {
    expect(classifySeverity("Admit Card for JEE Main 2026 released")).toBe(
      "CRITICAL"
    );
  });

  test("falls back to MINOR when no CRITICAL keyword present", () => {
    expect(classifySeverity("New schedule available for counselling")).toBe(
      "MINOR"
    );
  });

  test("NOISE when nothing matches", () => {
    expect(classifySeverity("Welcome to the official portal")).toBe("NOISE");
  });

  test("CRITICAL takes priority over MINOR when both present", () => {
    expect(classifySeverity("New result declared today")).toBe("CRITICAL");
  });

  test("word boundary blocks partial match: 'results' does not trigger 'result'", () => {
    expect(classifySeverity("Annual results compilation report")).toBe(
      "NOISE"
    );
  });

  test("word boundary blocks partial match: 'renewed' does not trigger 'new'", () => {
    expect(classifySeverity("Contract renewed for another year")).toBe(
      "NOISE"
    );
  });

  test("word boundary blocks partial match: 'updates' does not trigger 'updated'", () => {
    expect(classifySeverity("Server updates pending")).toBe("NOISE");
  });

  test("matches keyword at start of string", () => {
    expect(classifySeverity("Cutoff list for round 2 published")).toBe(
      "CRITICAL"
    );
  });

  test("matches keyword at end of string", () => {
    expect(classifySeverity("Exam postponed")).toBe("CRITICAL");
  });

  test("non-string-safe: does not throw on null title", () => {
    expect(() => classifySeverity(null)).not.toThrow();
  });
});
