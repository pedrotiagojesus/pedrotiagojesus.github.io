import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";

// CSS
import "@styles/base.css";
import "@styles/globals.css";

// I18n
import "@config/i18n";

// Router
import { router } from "./router";

// Providers
import { AppProviders } from "./providers/AppProviders";

// Analytics
import { initGA } from "./analytics";

// Components
import Loading from "@components/Loading/Loading";

// Initialize Google Analytics once
initGA();

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <AppProviders>
            <Suspense fallback={<Loading />}>
                <RouterProvider router={router} />
            </Suspense>
        </AppProviders>
    </StrictMode>
);
