import { useTranslation } from "react-i18next";

export const getVocabulary = (path: string): string => {
    const { t } = useTranslation("vocabulary");
    return t(path, { ns: "vocabulary" });
};

export const getContent = (path: string) => {
    const { t } = useTranslation("content");
    return t(path, { ns: "content", returnObjects: true });
};