import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// Bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";

// Fontawesome
import "./assets/fontawesome-free-6.6.0-web/css/all.min.css";

// CSS
import "./root.css";
import "./btn.css";
import "./index.css";
import "./sweetalert.css";

// Pages
import App from "./App.tsx";
import Homepage from "./pages/Homepage/Homepage.tsx";
import Contact from "./pages/Contact/Contact.tsx";

// I18n
import "./i18n";

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
                path: "/contact",
                element: <Contact />,
            },
        ],
    },
]);

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <RouterProvider router={router} />
    </StrictMode>
);
