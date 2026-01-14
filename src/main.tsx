import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// CSS
import "@styles/base.css";
import "@styles/globals.css";

import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./queryClient";

// Contexts
import { ActivePageProvider } from "@contexts/ActivePageContext";
import { ThemeContextProvider } from "@contexts/ThemeContext";
import { HelmetProvider } from "react-helmet-async";
import { VocabularyProvider } from "@contexts/VocabularyContext";
import { ToastProvider } from "@contexts/ToastContext";

// I18n
import "@config/i18n";

// Pages
import App from "./App";
import Homepage from "@pages/Homepage/Homepage";
import Experience from "@pages/Experience/Experience";
import Project from "@pages/Project/Project";
import About from "@pages/About/About";
import ProjectItem from "@pages/Project/ProjectItem";
import Contact from "@pages/Contact/Contact";

// Load FontAwesome after initial render to avoid blocking critical path
const loadFontAwesome = () => {
    // Load optimized font-face declarations first (with font-display: swap)
    import("@styles/fontawesome-optimized.css");
    // Then load the icon classes
    import("@assets/fonts/fontawesome-free-6.6.0-web/css/all.min.css");
};

// Load FontAwesome when browser is idle
if (typeof requestIdleCallback !== "undefined") {
    requestIdleCallback(loadFontAwesome);
} else {
    // Fallback: load after a delay
    setTimeout(loadFontAwesome, 500);
}

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/",
                element: <Homepage />,
            },
            {
                path: "/experience",
                element: <Experience />,
            },
            {
                path: "/project",
                element: <Project />,
            },
            {
                path: "/project/:slug",
                element: <ProjectItem />,
            },
            {
                path: "/about",
                element: <About />,
            },
            {
                path: "/contact",
                element: <Contact />,
            },
        ],
    },
]);

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <HelmetProvider>
            <QueryClientProvider client={queryClient}>
                <ActivePageProvider>
                    <ThemeContextProvider>
                        <ToastProvider>
                            <VocabularyProvider>
                                <RouterProvider router={router} />
                            </VocabularyProvider>
                        </ToastProvider>
                    </ThemeContextProvider>
                </ActivePageProvider>
            </QueryClientProvider>
        </HelmetProvider>
    </StrictMode>
);
