import client from "../api/client";
import API_ENDPOINTS from "../api/endpoint";

export const getProfiles = async (lang: string) => {
    const response = await client.get(API_ENDPOINTS.PROFILE, {
        params: {
            lang,
        },
    });
    return response.data;
};
