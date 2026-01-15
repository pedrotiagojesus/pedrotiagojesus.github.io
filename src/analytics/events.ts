import ReactGA from "react-ga4";

export const trackLinkedinClick = (location: string) => {
    ReactGA.event("contact_linkedin", { location });
};

export const trackGithubClick = (location: string) => {
    ReactGA.event("contact_github", { location });
};

export const trackXClick = (location: string) => {
    ReactGA.event("contact_x", { location });
};

export const trackEmailClick = (location: string) => {
    ReactGA.event("contact_email", { location });
};

export const trackCVClick = (location: string) => {
    ReactGA.event("cv", { location });
};
