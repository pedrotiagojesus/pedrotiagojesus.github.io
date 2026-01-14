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
    description: string;
    coverImage: string;
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
    content: [];
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
};

export type Education = {
    id: number;
    organization: string;
    degree: string;
    dateStart: string;
    dateEnd: string;
    description: string;
};

export type Certification = {
    id: number;
    name: string;
    date: string;
    url: string;
    description: string;
};

export type SEOProps = {
    title?: string;
    description?: string;
    image?: string;
    url?: string;
    type?: "website" | "article" | "profile";
    noIndex?: boolean;
};
declare global {
    interface Window {
        grecaptcha: any;
    }
}
export {};
