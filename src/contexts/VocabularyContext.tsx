import { ReactNode, createContext, useContext } from "react";
import { useVocabularies } from "@hooks/useVocabularies";
import type { UseQueryResult } from "@tanstack/react-query";
import type { I18nObject } from "@typesLocal/index";

type VocabularyContextType = UseQueryResult<I18nObject, Error>;

const VocabularyContext = createContext<VocabularyContextType | null>(null);

type VocabularyProviderProps = {
    children: ReactNode;
};

export const VocabularyProvider = ({ children }: VocabularyProviderProps) => {
    const vocabQuery = useVocabularies();
    return <VocabularyContext.Provider value={vocabQuery}>{children}</VocabularyContext.Provider>;
};

export const useVocabulary = () => {
    const context = useContext(VocabularyContext);
    if (!context) {
        throw new Error("useVocabulary must be used within VocabularyProvider");
    }
    return context;
};
