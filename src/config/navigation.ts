import { trackEmailClick, trackGithubClick, trackLinkedinClick, trackXClick } from "@analytics/events";

export type NavItem = {
    to: string;
    icon: string;
    activeKey: string;
    i18nKey: string;
};

// Shared by Navigation (desktop sidebar) and HeaderMobile, so the two menus
// can't silently drift apart when a page is added, removed, or reordered.
export const NAV_ITEMS: NavItem[] = [
    { to: "/", icon: "fa-regular fa-compass", activeKey: "home", i18nKey: "navigation.home" },
    { to: "/experience", icon: "fa-solid fa-suitcase", activeKey: "experience", i18nKey: "navigation.experience" },
    { to: "/project", icon: "fa-solid fa-pencil", activeKey: "project", i18nKey: "navigation.projects" },
    { to: "/about", icon: "fa-regular fa-user", activeKey: "about", i18nKey: "navigation.about" },
    { to: "/contact", icon: "fa-solid fa-phone", activeKey: "contact", i18nKey: "navigation.contact" },
];

export type SocialItem = {
    href: string;
    icon: string;
    label: string;
    ariaLabel: string;
    track: (location: string) => void;
};

export const SOCIAL_ITEMS: SocialItem[] = [
    {
        href: "https://www.linkedin.com/in/pedro-jesus-7a1654140/",
        icon: "fa-brands fa-linkedin-in",
        label: "LinkedIn",
        ariaLabel: "LinkedIn profile",
        track: trackLinkedinClick,
    },
    {
        href: "https://github.com/pedrotiagojesus",
        icon: "fa-brands fa-github",
        label: "Github",
        ariaLabel: "GitHub profile",
        track: trackGithubClick,
    },
    {
        href: "https://x.com/PedroJe07463775",
        icon: "fa-brands fa-x-twitter",
        label: "X",
        ariaLabel: "X (Twitter) profile",
        track: trackXClick,
    },
    {
        href: "mailto:pedrotiagojesus1995@gmail.com",
        icon: "fa-regular fa-envelope",
        label: "Email",
        ariaLabel: "Send email",
        track: trackEmailClick,
    },
];
