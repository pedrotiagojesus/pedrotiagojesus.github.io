import client from "../api/client";
import API_ENDPOINTS from "../api/endpoint";

interface EmailPayload {
    name: string;
    email: string;
    message: string;
    recaptchaToken: string;
}

export const postEmail = async (payload: EmailPayload) => {
    const response = await client.post(API_ENDPOINTS.EMAIL, payload);
    return response.data;
};
