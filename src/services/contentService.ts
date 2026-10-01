import client from "../api/client";
import API_ENDPOINTS from "../api/endpoint";
import { contentsResponseSchema, type ContentSection, type ContentsResponse } from "@typesLocal/index";

export const getContents = async (lang: string, sections?: ContentSection[], projectsSlug?: string[]): Promise<ContentsResponse> => {
    const response = await client.get(API_ENDPOINTS.CONTENT, {
        params: {
            lang,
            sections: sections?.join(","),
            projectsSlug: projectsSlug?.join(","),
        },
    });
    return contentsResponseSchema.parse(response.data);
};
