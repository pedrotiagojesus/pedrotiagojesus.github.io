import { describe, expect, it } from "vitest";
import { envSchema } from "./env";

describe("envSchema.VITE_PRODUCTION", () => {
    it.each(["true", "TRUE", " true "])("treats %j as true", (value) => {
        expect(envSchema.parse({ VITE_PRODUCTION: value }).VITE_PRODUCTION).toBe(true);
    });

    it.each(["false", "FALSE", "", "0", "1", "yes", "anything"])("treats %j as false", (value) => {
        expect(envSchema.parse({ VITE_PRODUCTION: value }).VITE_PRODUCTION).toBe(false);
    });

    it("defaults to false when not defined", () => {
        expect(envSchema.parse({}).VITE_PRODUCTION).toBe(false);
    });
});
