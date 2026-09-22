import { ReactNode, ElementType } from "react";

export type I18nObject = {
    [key: string]: string | I18nObject;
};

export type Card = {
    htmlElement?: ElementType;
    title: string;
    description: ReactNode;
    image?: string;
    link?: string;
    linkCover?: boolean;
    isLcp?: boolean;
};

export type CardSkeleton = {
    title: boolean;
    description: boolean;
    image: boolean;
};

export type Project = {
    id: number;
    name: string;
    slug: string;
    description: string;
    coverImage: string;
    urlDemo: string;
    urlSource: string;
    imageArr: string[];
    display: boolean;
};

export type ProjectList = {
    title: string;
    projects: Project[];
    showViewAllButton: boolean;
    isLoading: boolean;
    itemLimit?: number;
    keyPrefix: string;
};

export type Experience = {
    id: number;
    company: string;
    role: string;
    dateStart: number;
    dateEnd: number | string;
    content: string[];
};

export type About = {
    summary: string;
    content: string[];
    interest: string;
    hobby: string;
};

export type Skill = {
    id: number;
    name: string;
    percentage: string;
};

export type Language = {
    name: string;
    level: number;
};

export type Education = {
    organization: string;
    degree: string;
    dateStart: number;
    dateEnd: number;
    description: string;
};

export type Certification = {
    id: number;
    name: string;
    date: string;
    url: string;
    description: string;
};

export type Profile = {
    aboutMe: About;
    certifications: Certification[];
    education: Education[];
    language: Language[];
    skill: Skill[];
    softSkill: string[];
};

export type ContentSeoPage = "home" | "projects" | "project" | "profile" | "experience" | "contact";

export type ContentSeoEntry = {
    title: string;
    description: string;
};

export type ContentSeo = Partial<Record<ContentSeoPage, ContentSeoEntry>>;

export type ContentsResponse = {
    seo?: ContentSeo;
    projects?: Project[];
    experience?: Experience[];
    profile?: Profile;
};

export type SEOProps = {
    title?: string;
    description?: string;
    image?: string;
    url?: string;
    type?: "website" | "article" | "profile";
    noIndex?: boolean;
};
interface Grecaptcha {
    execute: (siteKey: string, options: { action: string }) => Promise<string>;
}

declare global {
    interface Window {
        grecaptcha: Grecaptcha;
    }
}
export {};
