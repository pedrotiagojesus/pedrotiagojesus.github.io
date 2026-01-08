import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";

import { getVocabularies } from "@service/vocabularyService";

export function useVocabularies() {
    const { i18n } = useTranslation();
    return useQuery({
        queryKey: ["vocabularies", i18n.language],
        queryFn: () => getVocabularies(i18n.language),
        staleTime: 1000 * 60 * 5,
        // cacheTime: 1000 * 60 * 30,
        retry: 1,
    });
}
