import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";

// Pages
import App from "./App";

const Homepage = lazy(() => import("@pages/Homepage/Homepage"));
const Experience = lazy(() => import("@pages/Experience/Experience"));
const Project = lazy(() => import("@pages/Project/Project"));
const ProjectItem = lazy(() => import("@pages/Project/ProjectItem"));
const About = lazy(() => import("@pages/About/About"));
const Contact = lazy(() => import("@pages/Contact/Contact"));
const NotFound = lazy(() => import("@pages/NotFound/NotFound"));

export const router = createBrowserRouter([
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
