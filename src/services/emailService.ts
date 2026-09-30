import client from "../api/client";
import API_ENDPOINTS from "../api/endpoint";
import type { EmailPayload, EmailResponse } from "@typesLocal/index";

export const postEmail = async (payload: EmailPayload): Promise<EmailResponse> => {
    const response = await client.post<EmailResponse>(API_ENDPOINTS.EMAIL, payload);
    return response.data;
};
