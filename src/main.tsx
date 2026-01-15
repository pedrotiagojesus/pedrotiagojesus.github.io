import { StrictMode, lazy, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// CSS
import "@styles/base.css";
import "@styles/globals.css";

// I18n
import "@config/i18n";

// Pages
import App from "./App";
const Homepage = lazy(() => import("@pages/Homepage/Homepage"));
const Experience = lazy(() => import("@pages/Experience/Experience"));
const Project = lazy(() => import("@pages/Project/Project"));
const ProjectItem = lazy(() => import("@pages/Project/ProjectItem"));
const About = lazy(() => import("@pages/About/About"));
const Contact = lazy(() => import("@pages/Contact/Contact"));
const NotFound = lazy(() => import("@pages/NotFound/NotFound"));

// Providers
import { AppProviders } from "./providers/AppProviders";

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
                index: true,
                element: <Homepage />,
            },
            {
                path: "experience",
                element: <Experience />,
            },
            {
                path: "project",
                element: <Project />,
            },
            {
                path: "project/:slug",
                element: <ProjectItem />,
            },
            {
                path: "about",
                element: <About />,
            },
            {
                path: "contact",
                element: <Contact />,
            },
            {
                path: "*",
                element: <NotFound />,
            },
        ],
    },
]);

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <AppProviders>
            <Suspense fallback={<div>Loading...</div>}>
                <RouterProvider router={router} />
            </Suspense>
        </AppProviders>
    </StrictMode>
);
