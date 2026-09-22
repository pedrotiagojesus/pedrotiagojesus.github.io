import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";

import { getContents } from "@service/contentService";
import type { ContentsResponse } from "@typesLocal/index";

export function useContents(sections: string[], projectsSlug?: string[]) {
    const { i18n } = useTranslation();
    return useQuery<ContentsResponse, Error>({
        queryKey: ["contents", i18n.language, sections, projectsSlug],
        queryFn: () => getContents(i18n.language, sections, projectsSlug),
        staleTime: 1000 * 60 * 5,
        retry: 1,
    });
}
