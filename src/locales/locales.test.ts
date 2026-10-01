import { describe, expect, it } from "vitest";
import pt from "./pt.json";
import en from "./en.json";

// Every leaf key as a dot path, e.g. "pages.about.title".
const keyPaths = (object: object, prefix = ""): string[] =>
    Object.entries(object).flatMap(([key, value]) => {
        const path = prefix ? `${prefix}.${key}` : key;
        return typeof value === "object" && value !== null ? keyPaths(value, path) : [path];
    });

describe("locales", () => {
    // The build already fails if en lacks a pt key (see config/i18n.ts); this
    // also catches the reverse, a key that only exists in en.
    it("pt and en have exactly the same keys", () => {
        expect(keyPaths(en).sort()).toEqual(keyPaths(pt).sort());
    });

    it.each([
        ["pt", pt],
        ["en", en],
    ])("%s has no empty strings", (_lang, locale) => {
        const values = keyPaths(locale).map((path) =>
            path.split(".").reduce<unknown>((acc, key) => (acc as Record<string, unknown>)[key], locale)
        );
        expect(values.filter((value) => value === "")).toEqual([]);
    });
});
