import { useEffect, useMemo } from "react";
import { useLocation } from "react-router-dom";

// Contexts
import { useActivePage } from "@contexts/ActivePageContext";

const ActivePage: React.FC = () => {
    const { pathname } = useLocation();
    const { setActivePage } = useActivePage();

    const page = useMemo(() => {
        const segment = pathname.split("/")[1];
        return segment || "home";
    }, [pathname]);

    useEffect(() => {
        setActivePage(page);
    }, [page, setActivePage]);

    return null;
};

export default ActivePage;
