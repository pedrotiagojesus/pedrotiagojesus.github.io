import { useVocabulary } from "@contexts/VocabularyContext";
import { I18nObject } from "@typesLocal/index";

export const useVocabularyText = (path: string): string => {
    const { data } = useVocabulary();
    if (!data) return "";
    const result = path.split(".").reduce<string | I18nObject>((acc, key) => {
        if (typeof acc === "object" && acc !== null) return acc[key];
        return "";
    }, data);
    return typeof result === "string" ? result : "";
};
