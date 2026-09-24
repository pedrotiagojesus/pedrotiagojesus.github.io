import client from "../api/client";
import API_ENDPOINTS from "../api/endpoint";

export const getVocabularies = async (lang: string) => {
    const response = await client.get(API_ENDPOINTS.VOCABULARY, {
        params: {
            lang,
        },
    });
    return response.data;
};
