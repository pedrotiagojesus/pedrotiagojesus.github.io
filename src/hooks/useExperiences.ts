import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";

import { getExperiences } from "@service/experienceService";

export function useExperiences() {
    const { i18n } = useTranslation();
    return useQuery({
        queryKey: ["experiences", i18n.language],
        queryFn: () => getExperiences(i18n.language),
    });
}
