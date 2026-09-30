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
    id: number;
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

export type ContentSeoPage = "home" | "projects" | "project" | "profile" | "experience" | "contact" | "cv";

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
