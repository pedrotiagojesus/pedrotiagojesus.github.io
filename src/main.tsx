import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// Fontawesome
import "./assets/fonts/fontawesome-free-6.6.0-web/css/all.min.css";

// CSS
import "./assets/css/index.css";
import "./assets/css/root.css";

// Contexts
import { ActivePageProvider } from "./contexts/ActivePageContext";
import { ThemeContextProvider } from "./contexts/ThemeContext";

// I18n
import "./i18n";

// Pages
import App from "./App";
import Homepage from "./pages/Homepage/Homepage";
import Experience from "./pages/Experience/Experience";
import Project from "./pages/Project/Project";
import About from "./pages/About/About";
import Stack from "./pages/Stack/Stack";
import ProjectItem from "./pages/Project/ProjectItem";

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
                path: "/stack",
                element: <Stack />,
            },
        ],
    },
]);

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <ActivePageProvider>
            <ThemeContextProvider>
                <RouterProvider router={router} />
            </ThemeContextProvider>
        </ActivePageProvider>
    </StrictMode>
);
