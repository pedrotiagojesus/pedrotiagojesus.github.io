import { z } from "zod";

// Each schema validates the backend's response at runtime; the matching type is
// inferred from it, so the two can't drift apart.

export const projectSchema = z.object({
    id: z.number(),
    name: z.string(),
    slug: z.string(),
    description: z.string(),
    coverImage: z.string(),
    urlDemo: z.string(),
    urlSource: z.string(),
    imageArr: z.array(z.string()),
    display: z.boolean(),
});
export type Project = z.infer<typeof projectSchema>;

export const experienceSchema = z.object({
    id: z.number(),
    company: z.string(),
    role: z.string(),
    dateStart: z.number(),
    dateEnd: z.union([z.number(), z.string()]),
    content: z.array(z.string()),
});
export type Experience = z.infer<typeof experienceSchema>;

export const aboutSchema = z.object({
    summary: z.string(),
    content: z.array(z.string()),
    interest: z.string(),
    hobby: z.string(),
});
export type About = z.infer<typeof aboutSchema>;

export const skillSchema = z.object({
    id: z.number(),
    name: z.string(),
    percentage: z.string(),
});
export type Skill = z.infer<typeof skillSchema>;

export const languageSchema = z.object({
    name: z.string(),
    level: z.number(),
});
export type Language = z.infer<typeof languageSchema>;

export const educationSchema = z.object({
    id: z.number(),
    organization: z.string(),
    degree: z.string(),
    dateStart: z.number(),
    dateEnd: z.number(),
    description: z.string(),
});
export type Education = z.infer<typeof educationSchema>;

export const certificationSchema = z.object({
    id: z.number(),
    name: z.string(),
    date: z.string(),
    url: z.string(),
    description: z.string(),
});
export type Certification = z.infer<typeof certificationSchema>;

export const profileSchema = z.object({
    aboutMe: aboutSchema,
    certifications: z.array(certificationSchema),
    education: z.array(educationSchema),
    language: z.array(languageSchema),
    skill: z.array(skillSchema),
    softSkill: z.array(z.string()),
});
export type Profile = z.infer<typeof profileSchema>;

export const contentSeoEntrySchema = z.object({
    title: z.string(),
    description: z.string(),
});
export type ContentSeoEntry = z.infer<typeof contentSeoEntrySchema>;

// An object rather than a record so that, like every other schema here, a page
// the backend adds before the frontend knows about it is dropped instead of
// failing the whole response.
export const contentSeoSchema = z
    .object({
        home: contentSeoEntrySchema,
        projects: contentSeoEntrySchema,
        project: contentSeoEntrySchema,
        profile: contentSeoEntrySchema,
        experience: contentSeoEntrySchema,
        contact: contentSeoEntrySchema,
        cv: contentSeoEntrySchema,
    })
    .partial();
export type ContentSeo = z.infer<typeof contentSeoSchema>;
export type ContentSeoPage = keyof ContentSeo;

export const contentsResponseSchema = z.object({
    seo: contentSeoSchema.optional(),
    projects: z.array(projectSchema).optional(),
    experience: z.array(experienceSchema).optional(),
    profile: profileSchema.optional(),
});
export type ContentsResponse = z.infer<typeof contentsResponseSchema>;

// Values accepted by the `sections` query param. Note the request uses
// "experiences" while the response field is `experience`.
export type ContentSection = "profile" | "projects" | "experiences" | "seo";
