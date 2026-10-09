import { env } from "@config/env";
import ReactGA from "react-ga4";

const loadGA = () => {
    ReactGA.initialize(env.VITE_GA_ID);
};

// requestIdleCallback isn't in every browser (Safari), so fall back to a timeout
const whenIdle = (callback: () => void) => {
    if ("requestIdleCallback" in window) {
        window.requestIdleCallback(callback);
    } else {
        setTimeout(callback, 1);
    }
};

// gtag.js is ~180KB and ran long tasks during load, delaying the page's own
// rendering; it's only loaded once the page has finished loading and the main
// thread is idle. The config command it runs sends the first page_view itself.
export const initGA = () => {
    if (!env.VITE_PRODUCTION || !env.VITE_GA_ID) return;

    if (document.readyState === "complete") {
        whenIdle(loadGA);
    } else {
        window.addEventListener("load", () => whenIdle(loadGA), { once: true });
    }
};
