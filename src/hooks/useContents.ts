import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";

import { getContents } from "@service/contentService";

export function useContents(sections: string[], projectsSlug?: string[]) {
    const { i18n } = useTranslation();
    return useQuery<{ [key: string]: any }, Error>({
        queryKey: ["contents", i18n.language, sections, projectsSlug],
        queryFn: () => getContents(i18n.language, sections, projectsSlug),
        staleTime: 1000 * 60 * 5,
        // cacheTime: 1000 * 60 * 30,
        retry: 1,
    });
}
