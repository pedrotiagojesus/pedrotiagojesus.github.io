import client from "../api/client";
import API_ENDPOINTS from "../api/endpoint";

export const getProjects = async (lang: string) => {
    const response = await client.get(API_ENDPOINTS.PROJECT, {
        params: {
            lang,
        },
    });
    return response.data;
};

export const getProject = async (lang: string, slug: string) => {
    const response = await client.get(API_ENDPOINTS.PROJECT.concat(`/${slug}`), {
        params: {
            lang,
        },
    });
    return response.data;
};
