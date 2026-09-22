// CSS
import "./Contact.css";

// Utils
import { useVocabularyText } from "@utils/vocabulary";

// Components
import Block from "@components/Block/Block";
import Seo from "@components/Seo";

// Context
import { useToast } from "@contexts/ToastContext";

// Hooks
import { useContents } from "@hooks/useContents";
import { env } from "@config/env";
import { useEffect, useState } from "react";
import { postEmail } from "@service/emailService";

// Api
import { ApiError } from "@api/errors";

const Contact = () => {
    const { showToast } = useToast();

    // Vocabulary
    const i18n = {
        title: useVocabularyText("pages.contact.title"),
        summary: useVocabularyText("pages.contact.summary"),
        name: useVocabularyText("pages.contact.name"),
        email: useVocabularyText("pages.contact.email"),
        message: useVocabularyText("pages.contact.message"),
        send: useVocabularyText("pages.contact.send"),
        messageSuccess: useVocabularyText("pages.contact.messageSuccess"),
        messageError: useVocabularyText("pages.contact.messageError"),
    };

    const { data } = useContents(["seo"]);

    // Seo
    const seo = data?.seo?.contact;

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [recaptchaReady, setRecaptchaReady] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        const scriptId = "recaptcha-script";
        const existingScript = document.getElementById(scriptId) as HTMLScriptElement | null;

        if (existingScript) {
            if (window.grecaptcha) setRecaptchaReady(true);
            else existingScript.addEventListener("load", () => setRecaptchaReady(true));
            return;
        }

        const script = document.createElement("script");
        script.id = scriptId;
        script.src = `https://www.google.com/recaptcha/api.js?render=${env.VITE_GOOGLE_RECAPTCHA_SITE_KEY}`;
        script.async = true;
        script.defer = true;
        script.onload = () => setRecaptchaReady(true);
        script.onerror = () => setRecaptchaReady(false);
        document.body.appendChild(script);
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!recaptchaReady || !window.grecaptcha) {
            showToast(i18n.messageError, "error");
            return;
        }

        setIsSubmitting(true);

        try {
            const token = await window.grecaptcha.execute(env.VITE_GOOGLE_RECAPTCHA_SITE_KEY, { action: "contact" });
            await postEmail({ name, email, message, recaptchaToken: token });
            showToast(i18n.messageSuccess, "success");
            setName("");
            setEmail("");
            setMessage("");
        } catch (err) {
            const apiError = err as ApiError;
            if (apiError?.requestId && import.meta.env.DEV) {
                console.error(`Contact form submission failed (requestId: ${apiError.requestId})`);
            }
            showToast(i18n.messageError, "error");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            <Seo title={seo?.title} description={seo?.description} />
            <section id="contact-content">
                <h1 className="page-title">{i18n.title}</h1>
                <p className="page-summary">{i18n.summary}</p>
                <form className="contact-form" method="POST" id="contact-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">{i18n.name}</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            onChange={(e) => setName(e.target.value)}
                            value={name}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">{i18n.email}</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="message">{i18n.message}</label>
                        <textarea
                            id="message"
                            name="message"
                            rows={8}
                            onChange={(e) => setMessage(e.target.value)}
                            value={message}
                            required
                        ></textarea>
                    </div>
                    <button className="btn btn-primary" type="submit" disabled={isSubmitting}>
                        {i18n.send}
                    </button>
                </form>
            </section>
            <Block />
        </>
    );
};

export default Contact;
