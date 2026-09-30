import client from "../api/client";
import API_ENDPOINTS from "../api/endpoint";
import type { I18nObject } from "@typesLocal/index";

export const getVocabularies = async (lang: string): Promise<I18nObject> => {
    const response = await client.get<I18nObject>(API_ENDPOINTS.VOCABULARY, {
        params: {
            lang,
        },
    });
    return response.data;
};
