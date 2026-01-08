import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";

import { getProfiles } from "@service/profileService";

export function useProfiles() {
    const { i18n } = useTranslation();
    return useQuery({
        queryKey: ["profiles", i18n.language],
        queryFn: () => getProfiles(i18n.language),
    });
}
