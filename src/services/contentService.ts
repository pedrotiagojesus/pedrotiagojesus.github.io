import client from "../api/client";
import API_ENDPOINTS from "../api/endpoint";

export const getContents = async (lang: string, sections?: string[], projectsSlug?: string[]) => {
    const response = await client.get(API_ENDPOINTS.CONTENT, {
        params: {
            lang,
            sections: sections?.join(","),
            projectsSlug: projectsSlug?.join(","),
        },
    });
    return response.data;
};
