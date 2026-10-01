import { useLayoutEffect, useMemo, useRef, useState } from "react";
import type { ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileArrowDown } from "@fortawesome/free-solid-svg-icons";

// CSS
import "./Cv.css";

// Components
import Seo from "@components/Seo/Seo";
import Loading from "@components/Loading/Loading";
import Button from "@components/Button/Button";

// Config
import { SITE_URL } from "@config/site";

// Hooks
import { useContents } from "@hooks/useContents";

// Image
import Avatar from "@assets/img/avatar.webp";

// Shown as `key: value` pairs; the key's label comes from pages.cv.contactKeys.
const CONTACTS = [
    { key: "email", value: "pedrotiagojesus1995@gmail.com" },
    { key: "web", value: "pedrotiagojesus.github.io" },
    { key: "location", value: "Lousã, Coimbra, Portugal" },
    { key: "linkedin", value: "linkedin.com/in/pedro-jesus-7a1654140" },
    { key: "github", value: "github.com/pedrotiagojesus" },
] as const;

const PDF_MARGIN_MM = 0;
const PDF_PAGE_WIDTH_MM = 210;
const PDF_PAGE_HEIGHT_MM = 297; 
const PDF_INNER_RATIO =
    (PDF_PAGE_HEIGHT_MM - 2 * PDF_MARGIN_MM) / (PDF_PAGE_WIDTH_MM - 2 * PDF_MARGIN_MM);

type CvBlock = { key: string; node: ReactNode };

const Cv = () => {
    const { data, isLoading, isError } = useContents(["profile", "experiences", "seo"]);
    const { t, i18n: i18next } = useTranslation();
    const cvRef = useRef<HTMLDivElement>(null);
    const measureContainerRef = useRef<HTMLDivElement>(null);
    const measureRefs = useRef<Array<HTMLDivElement | null>>([]);
    const [pages, setPages] = useState<number[][] | null>(null);
    const [isExporting, setIsExporting] = useState(false);

    const i18n = {
        experience: t("pages.experience.title"),
        skills: t("pages.about.sections.skills"),
        softSkills: t("pages.about.sections.softSkills"),
        education: t("pages.about.sections.education"),
        certificates: t("pages.about.sections.certificates"),
    };

    const profile = data?.profile;
    const aboutMe = profile?.aboutMe;
    const seo = data?.seo?.cv;

    const sidebarContent = useMemo<ReactNode>(() => {
        if (!profile) return null;

        const skillArr = profile.skill ?? [];
        const softSkillArr = profile.softSkill ?? [];
        const languageArr = profile.language ?? [];

        return (
            <>
                <div className="cv-sidebar-photo">
                    <img src={Avatar} alt="Pedro Jesus" />
                </div>
                <div className="cv-sidebar-block">
                    <h1 className="cv-name">Pedro Jesus</h1>
                    <p className="cv-role">Full Stack Developer</p>
                </div>
                <div className="cv-sidebar-block">
                    <h2 className="cv-sidebar-title">{t("pages.cv.contact")}</h2>
                    <ul className="cv-contacts">
                        {CONTACTS.map((contact) => (
                            <li key={contact.key}>
                                <span className="cv-contact-key">{t(`pages.cv.contactKeys.${contact.key}`)}</span>
                                <span>{contact.value}</span>
                            </li>
                        ))}
                    </ul>
                </div>
                {skillArr.length > 0 && (
                    <div className="cv-sidebar-block">
                        <h2 className="cv-sidebar-title">{i18n.skills}</h2>
                        <ul className="cv-token-list">
                            {skillArr.map((skill) => (
                                <li key={skill.id}>{skill.name}</li>
                            ))}
                        </ul>
                    </div>
                )}
                {softSkillArr.length > 0 && (
                    <div className="cv-sidebar-block">
                        <h2 className="cv-sidebar-title">{i18n.softSkills}</h2>
                        <ul className="cv-token-list">
                            {softSkillArr.map((item, index) => (
                                <li key={`${item}-${index}`}>{item}</li>
                            ))}
                        </ul>
                    </div>
                )}
                {languageArr.length > 0 && (
                    <div className="cv-sidebar-block">
                        <h2 className="cv-sidebar-title">{t("pages.cv.languages")}</h2>
                        <ul className="cv-token-list">
                            {languageArr.map((lang) => (
                                <li key={lang.name}>{lang.name}</li>
                            ))}
                        </ul>
                    </div>
                )}
            </>
        );
    }, [profile, i18n.skills, i18n.softSkills, t]);

    const mainBlocks = useMemo<CvBlock[]>(() => {
        if (!profile) return [];

        const educationArr = profile.education ?? [];
        const certificationArr = profile.certifications ?? [];
        const experienceArr = data?.experience ?? [];

        const list: CvBlock[] = [];

        if (aboutMe?.summary) {
            list.push({
                key: "summary",
                node: (
                    <section className="cv-section">
                        <p className="cv-summary">{aboutMe.summary}</p>
                    </section>
                ),
            });
        }

        experienceArr.forEach((exp, index) => {
            list.push({
                key: `experience-${exp.id}`,
                node: (
                    <section className="cv-section">
                        {index === 0 && <h2 className="cv-section-title">{i18n.experience}</h2>}
                        <article className="cv-entry">
                            <div className="cv-entry-head">
                                <h3>{exp.role}</h3>
                                <span className="cv-entry-date">
                                    {exp.dateStart} – {exp.dateEnd}
                                </span>
                            </div>
                            <p className="cv-entry-subtitle cv-entry-company">{exp.company}</p>
                            <ul className="cv-entry-list">
                                {exp.content.map((item, i) => (
                                    <li key={`${item}-${i}`}>{item}</li>
                                ))}
                            </ul>
                        </article>
                    </section>
                ),
            });
        });

        educationArr.forEach((item, index) => {
            list.push({
                key: `education-${index}`,
                node: (
                    <section className="cv-section">
                        {index === 0 && <h2 className="cv-section-title">{i18n.education}</h2>}
                        <article className="cv-entry">
                            <div className="cv-entry-head">
                                <h3>{item.organization}</h3>
                                <span className="cv-entry-date">
                                    {item.dateStart} – {item.dateEnd}
                                </span>
                            </div>
                            <p className="cv-entry-subtitle">{item.degree}</p>
                        </article>
                    </section>
                ),
            });
        });

        certificationArr.forEach((cert, index) => {
            list.push({
                key: `certification-${cert.id}`,
                node: (
                    <section className="cv-section">
                        {index === 0 && <h2 className="cv-section-title">{i18n.certificates}</h2>}
                        <article className="cv-entry">
                            <div className="cv-entry-head">
                                <h3>{cert.name}</h3>
                                <span className="cv-entry-date">{cert.date}</span>
                            </div>
                        </article>
                    </section>
                ),
            });
        });

        return list;
    }, [profile, aboutMe, data?.experience, i18n.experience, i18n.education, i18n.certificates]);

    // Measures each main-content block's real rendered height (via the
    // always-present, off-screen .cv-measure copy below, at the narrower
    // page-1 main-column width) and greedily packs them into pages that
    // don't exceed one A4 sheet's usable height, using the exact same
    // width-to-height ratio html2pdf.js uses when it paginates the download.
    useLayoutEffect(() => {
        if (mainBlocks.length === 0) {
            setPages(null);
            return;
        }

        // The page-height budget is based on the *full page's* rendered
        // width (a page is one page tall regardless of what columns are
        // inside it) — read directly from .cv-container, independently of
        // whatever the sidebar's width happens to be.
        const fullPageWidthPx = cvRef.current?.getBoundingClientRect().width ?? 0;
        const pageContentHeightPx = fullPageWidthPx * PDF_INNER_RATIO;

        const heights = measureRefs.current.slice(0, mainBlocks.length).map((el) => el?.offsetHeight ?? 0);
        const groups: number[][] = [];
        let current: number[] = [];
        let currentHeight = 0;

        heights.forEach((height, index) => {
            if (current.length > 0 && currentHeight + height > pageContentHeightPx) {
                groups.push(current);
                current = [];
                currentHeight = 0;
            }
            current.push(index);
            currentHeight += height;
        });

        if (current.length > 0) groups.push(current);

        setPages(groups);
    }, [mainBlocks]);

    const handleDownload = async () => {
        if (!cvRef.current || isExporting) return;

        // Collapsing to a single flowing page (sidebar + page-1 main content,
        // then remaining main content continuing below at full width, no
        // simulated gaps) for the capture, and masking the brief
        // color-flatten with the overlay below, is what's proven to produce
        // a correct PDF — the multi-page preview below is a separate,
        // purely visual on-screen simulation.
        setIsExporting(true);
        cvRef.current.classList.add("cv-export");

        // html2canvas can capture before the self-hosted Roboto/Lato faces
        // (font-display: swap) have actually finished loading, silently
        // falling back to the browser's default font for that render —
        // which has different character widths, so text wraps differently
        // in the PDF than what's shown on screen. Waiting for this first
        // avoids that mismatch.
        await document.fonts.ready;
        await new Promise((resolve) => requestAnimationFrame(resolve));

        try {
            const html2pdf = (await import("html2pdf.js")).default;
            const worker = html2pdf();

            // The bundled type.d.ts doesn't declare `pagebreak`, even though
            // the library supports it (confirmed in its source). Typing the
            // options through the worker's own `.set` signature keeps
            // everything else here type-checked, rather than casting the
            // whole call to `any`.
            type PdfOptions = Parameters<typeof worker.set>[0];

            await worker
                .set({
                    margin: 0,
                    filename: `Pedro-Jesus-CV-${i18next.language}.pdf`,
                    image: { type: "jpeg", quality: 0.98 },
                    html2canvas: { scale: 1, useCORS: true },
                    jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
                    // html2pdf.js's own pagebreak pre-processing (default:
                    // ['css', 'legacy']) walks the DOM before capture and
                    // inserts blank spacer <div>s wherever a break-inside:
                    // avoid element (.cv-entry) would otherwise straddle
                    // *its own* page-height guess — independent of, and not
                    // aware of, the pagination this component already
                    // computes. That's what showed up as an unexplained gap
                    // after the certifications block that never appeared in
                    // the on-screen preview. Turning it off leaves a plain
                    // canvas slice with no extra DOM mutation.
                    pagebreak: { mode: [] },
                } as PdfOptions)
                .from(cvRef.current)
                .save();
        } catch (error) {
            console.error("[cv] failed to generate PDF", error);
        } finally {
            cvRef.current?.classList.remove("cv-export");
            setIsExporting(false);
        }
    };

    if (isLoading) return <Loading />;
    if (isError) return <p>{t("pages.cv.loadError")}</p>;

    // While exporting (or before the first measurement completes), fall
    // back to putting everything on "page 1" — matching the flat layout
    // that's proven to capture correctly.
    const page1Indices = pages?.[0] ?? mainBlocks.map((_, index) => index);
    const laterPageGroups = pages && pages.length > 0 ? pages.slice(1) : [];

    return (
        <>
            <Seo title={seo?.title} description={seo?.description} url={SITE_URL + "/cv"} />
            <div className="cv-toolbar">
                <Button variant="primary" onClick={handleDownload} disabled={isExporting}>
                    <FontAwesomeIcon icon={faFileArrowDown} /> {isExporting ? t("pages.cv.generating") : t("pages.cv.download")}
                </Button>
            </div>
            {isExporting && (
                <div className="cv-export-overlay">
                    <span className="cv-export-spinner" aria-hidden="true" />
                    <p>{t("pages.cv.generatingPdf")}</p>
                </div>
            )}

            {/* Hidden, always-flat copy used only to measure each main-content
                block's real rendered height at the page-1 main-column width,
                so the visible copy below can be grouped into simulated A4
                pages without guessing at sizes. */}
            <div className="cv-measure" ref={measureContainerRef} aria-hidden="true">
                {mainBlocks.map((block, index) => (
                    <div key={block.key} ref={(el) => (measureRefs.current[index] = el)}>
                        {block.node}
                    </div>
                ))}
            </div>

            <div className="cv-container" ref={cvRef}>
                <div className="cv-page cv-page-cover">
                    <aside className="cv-sidebar">{sidebarContent}</aside>
                    <div className="cv-main">
                        {page1Indices.map((blockIndex) => (
                            <div key={mainBlocks[blockIndex].key}>{mainBlocks[blockIndex].node}</div>
                        ))}
                    </div>
                </div>

                {!isExporting &&
                    laterPageGroups.map((group, pageIndex) => (
                        <div key={pageIndex} className="cv-page">
                            {group.map((blockIndex) => (
                                <div key={mainBlocks[blockIndex].key}>{mainBlocks[blockIndex].node}</div>
                            ))}
                        </div>
                    ))}

                {/* Export only: same later content, continuing directly below
                    the cover section with no visual gap, so html2pdf's own
                    canvas slicing (not this component) decides the real
                    page breaks from here on. */}
                {isExporting && laterPageGroups.length > 0 && (
                    <div className="cv-page">
                        {laterPageGroups.flat().map((blockIndex) => (
                            <div key={mainBlocks[blockIndex].key}>{mainBlocks[blockIndex].node}</div>
                        ))}
                    </div>
                )}
            </div>
        </>
    );
};

export default Cv;
