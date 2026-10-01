import { ReactNode } from "react";
import { HelmetProvider } from "react-helmet-async";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "../queryClient";
import { ActivePageProvider } from "@contexts/ActivePageContext";
import { ThemeContextProvider } from "@contexts/ThemeContext";
import { ToastProvider } from "@contexts/ToastContext";

interface Props {
    children: ReactNode;
}

export function AppProviders({ children }: Props) {
    return (
        <HelmetProvider>
            <QueryClientProvider client={queryClient}>
                <ThemeContextProvider>
                    <ToastProvider>
                        <ActivePageProvider>{children}</ActivePageProvider>
                    </ToastProvider>
                </ThemeContextProvider>
            </QueryClientProvider>
        </HelmetProvider>
    );
}
