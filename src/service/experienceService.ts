import client from "../api/client";
import API_ENDPOINTS from "../api/endpoint";

export const getExperiences = async (lang: string) => {
    const response = await client.get(API_ENDPOINTS.EXPERIENCE, {
        params: {
            lang,
        },
    });
    return response.data;
};
