import { z } from "zod";

export type EmailPayload = {
    name: string;
    email: string;
    message: string;
    recaptchaToken: string;
};

export const emailResponseSchema = z.object({
    success: z.boolean(),
});
export type EmailResponse = z.infer<typeof emailResponseSchema>;
