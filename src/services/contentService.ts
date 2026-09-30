import client from "../api/client";
import API_ENDPOINTS from "../api/endpoint";
import type { ContentsResponse } from "@typesLocal/index";

export const getContents = async (lang: string, sections?: string[], projectsSlug?: string[]): Promise<ContentsResponse> => {
    const response = await client.get<ContentsResponse>(API_ENDPOINTS.CONTENT, {
        params: {
            lang,
            sections: sections?.join(","),
            projectsSlug: projectsSlug?.join(","),
        },
    });
    return response.data;
};
