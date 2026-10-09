import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import ReactGA from "react-ga4";

// Page views on client-side navigation. Skipped until GA has loaded (see
// initGA): its config command already counts the page it loads on, and a
// page_view sent before config would reach the dataLayer with no destination.
export const usePageTracking = () => {
    const location = useLocation();
    useEffect(() => {
        if (ReactGA.isInitialized) {
            ReactGA.send({
                hitType: "pageview",
                page: location.pathname,
            });
        }
    }, [location]);
};
