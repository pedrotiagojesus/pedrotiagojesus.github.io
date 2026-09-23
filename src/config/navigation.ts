import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { faCompass, faEnvelope, faUser } from "@fortawesome/free-regular-svg-icons";
import { faSuitcase, faPencil, faPhone } from "@fortawesome/free-solid-svg-icons";
import { faLinkedinIn, faGithub, faXTwitter } from "@fortawesome/free-brands-svg-icons";

import { trackEmailClick, trackGithubClick, trackLinkedinClick, trackXClick } from "@analytics/events";

export type NavItem = {
    to: string;
    icon: IconDefinition;
    activeKey: string;
    i18nKey: string;
};

// Shared by Navigation (desktop sidebar) and HeaderMobile, so the two menus
// can't silently drift apart when a page is added, removed, or reordered.
export const NAV_ITEMS: NavItem[] = [
    { to: "/", icon: faCompass, activeKey: "home", i18nKey: "navigation.home" },
    { to: "/experience", icon: faSuitcase, activeKey: "experience", i18nKey: "navigation.experience" },
    { to: "/project", icon: faPencil, activeKey: "project", i18nKey: "navigation.projects" },
    { to: "/about", icon: faUser, activeKey: "about", i18nKey: "navigation.about" },
    { to: "/contact", icon: faPhone, activeKey: "contact", i18nKey: "navigation.contact" },
];

export type SocialItem = {
    href: string;
    icon: IconDefinition;
    label: string;
    ariaLabel: string;
    track: (location: string) => void;
};

export const SOCIAL_ITEMS: SocialItem[] = [
    {
        href: "https://www.linkedin.com/in/pedro-jesus-7a1654140/",
        icon: faLinkedinIn,
        label: "LinkedIn",
        ariaLabel: "LinkedIn profile",
        track: trackLinkedinClick,
    },
    {
        href: "https://github.com/pedrotiagojesus",
        icon: faGithub,
        label: "Github",
        ariaLabel: "GitHub profile",
        track: trackGithubClick,
    },
    {
        href: "https://x.com/PedroJe07463775",
        icon: faXTwitter,
        label: "X",
        ariaLabel: "X (Twitter) profile",
        track: trackXClick,
    },
    {
        href: "mailto:pedrotiagojesus1995@gmail.com",
        icon: faEnvelope,
        label: "Email",
        ariaLabel: "Send email",
        track: trackEmailClick,
    },
];
