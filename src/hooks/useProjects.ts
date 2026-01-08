import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";

import { getProjects, getProject } from "@service/projectService";

export function useProjects() {
    const { i18n } = useTranslation();
    return useQuery({
        queryKey: ["projects", i18n.language],
        queryFn: () => getProjects(i18n.language),
    });
}

export function useProject(slug: string) {
    const { i18n } = useTranslation();
    return useQuery({
        queryKey: ["project", i18n.language],
        queryFn: () => getProject(i18n.language, slug),
    });
}
