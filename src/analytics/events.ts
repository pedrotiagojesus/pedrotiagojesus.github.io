import ReactGA from "react-ga4";
import { env } from "@config/env";

const trackEvent = (eventName: string, params: Record<string, unknown>) => {
    if (env.VITE_PRODUCTION && env.VITE_GA_ID) {
        ReactGA.event(eventName, params);
    }
};

export const trackLinkedinClick = (location: string) => {
    trackEvent("contact_linkedin", { location });
};

export const trackGithubClick = (location: string) => {
    trackEvent("contact_github", { location });
};

export const trackXClick = (location: string) => {
    trackEvent("contact_x", { location });
};

export const trackEmailClick = (location: string) => {
    trackEvent("contact_email", { location });
};

export const trackCVClick = (location: string) => {
    trackEvent("cv", { location });
};
