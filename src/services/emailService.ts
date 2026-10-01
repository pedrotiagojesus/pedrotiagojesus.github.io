import client from "../api/client";
import API_ENDPOINTS from "../api/endpoint";
import { emailResponseSchema, type EmailPayload, type EmailResponse } from "@typesLocal/index";

export const postEmail = async (payload: EmailPayload): Promise<EmailResponse> => {
    const response = await client.post(API_ENDPOINTS.EMAIL, payload);
    return emailResponseSchema.parse(response.data);
};
