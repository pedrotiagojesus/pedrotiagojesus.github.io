import { useVocabulary } from "@contexts/VocabularyContext";
import { I18nObject } from "@typesLocal/index";

export const vocabulary = (path: string): string => {
    const { data } = useVocabulary() as { data: I18nObject };
    if (!data) return "";
    return path.split(".").reduce((acc: any, key: string) => {
        if (typeof acc === "object" && acc !== null) return acc[key];
        return "";
    }, data);
};
