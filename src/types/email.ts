export type EmailPayload = {
    name: string;
    email: string;
    message: string;
    recaptchaToken: string;
};

export type EmailResponse = {
    success: boolean;
};
