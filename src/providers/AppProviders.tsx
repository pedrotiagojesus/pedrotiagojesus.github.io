import { ReactNode } from "react";
import { HelmetProvider } from "react-helmet-async";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "../queryClient";
import { ActivePageProvider } from "@contexts/ActivePageContext";
import { ThemeContextProvider } from "@contexts/ThemeContext";
import { ToastProvider } from "@contexts/ToastContext";
import { VocabularyProvider } from "@contexts/VocabularyContext";

interface Props {
    children: ReactNode;
}

export function AppProviders({ children }: Props) {
    return (
        <HelmetProvider>
            <QueryClientProvider client={queryClient}>
                <ThemeContextProvider>
                    <ToastProvider>
                        <ActivePageProvider>
                            <VocabularyProvider>{children}</VocabularyProvider>
                        </ActivePageProvider>
                    </ToastProvider>
                </ThemeContextProvider>
            </QueryClientProvider>
        </HelmetProvider>
    );
}
