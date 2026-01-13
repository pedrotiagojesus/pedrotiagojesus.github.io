import { z } from "zod";

const envSchema = z.object({
    // Basic Configuration
    VITE_ENDPOINT: z.string().default(""),
    VITE_ENDPOINT_PUBLIC: z.string().default(""),
    VITE_TIMEOUT: z.string().default("30000").transform(Number).pipe(z.number().positive()),
    VITE_GOOGLE_RECAPTCHA_SITE_KEY: z.string().default(""),
});

export type EnvConfig = z.infer<typeof envSchema>;

export const env = envSchema.parse(import.meta.env);