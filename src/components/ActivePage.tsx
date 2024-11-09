// src/components/ScrollToTop.tsx
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// Contexts
import { useActivePage } from "../contexts/ActivePageContext";

const ActivePage: React.FC = () => {
    const { pathname } = useLocation();
    const { setActivePage } = useActivePage();

    const pathnameArr = pathname.split("/");
    let page = pathnameArr[1];

    if (page == "") {
        page = "home";
    }

    useEffect(() => {
        setActivePage(page);
    }, [page]);

    return null;
};

export default ActivePage;
