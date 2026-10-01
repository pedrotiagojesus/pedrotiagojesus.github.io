import { describe, expect, it } from "vitest";
import { contentsResponseSchema } from "./content";

const project = {
    id: 1,
    name: "Portfolio",
    slug: "portfolio",
    description: "My portfolio",
    coverImage: "cover.webp",
    urlDemo: "",
    urlSource: "https://github.com",
    imageArr: [],
    display: true,
};

describe("contentsResponseSchema", () => {
    it("accepts a response with no sections", () => {
        expect(contentsResponseSchema.parse({})).toEqual({});
    });

    it("accepts a valid project", () => {
        expect(contentsResponseSchema.parse({ projects: [project] }).projects).toEqual([project]);
    });

    it("rejects a field with the wrong type", () => {
        expect(contentsResponseSchema.safeParse({ projects: [{ ...project, id: "1" }] }).success).toBe(false);
    });

    it("rejects a missing required field", () => {
        const withoutSlug: Partial<typeof project> = { ...project };
        delete withoutSlug.slug;
        expect(contentsResponseSchema.safeParse({ projects: [withoutSlug] }).success).toBe(false);
    });

    it("drops fields the frontend doesn't know about", () => {
        const parsed = contentsResponseSchema.parse({ projects: [{ ...project, extra: true }] });
        expect(parsed.projects?.[0]).not.toHaveProperty("extra");
    });

    it("drops SEO pages the frontend doesn't know about instead of failing", () => {
        const entry = { title: "Title", description: "Description" };
        const parsed = contentsResponseSchema.parse({ seo: { home: entry, newPage: entry } });
        expect(parsed.seo).toEqual({ home: entry });
    });

    it.each(["presente", 2024])("accepts %j as an experience end date", (dateEnd) => {
        const experience = { id: 1, company: "Company", role: "Dev", dateStart: 2020, dateEnd, content: [] };
        expect(contentsResponseSchema.safeParse({ experience: [experience] }).success).toBe(true);
    });
});
