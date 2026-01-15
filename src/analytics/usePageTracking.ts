import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import ReactGA from "react-ga4";
import { env } from "@config/env";

export const usePageTracking = () => {
    const location = useLocation();
    useEffect(() => {
        if (env.VITE_PRODUCTION) {
            ReactGA.send({
                hitType: "pageview",
                page: location.pathname,
            });
        }
    }, [location]);
};
