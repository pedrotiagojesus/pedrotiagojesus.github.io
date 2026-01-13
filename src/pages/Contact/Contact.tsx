// CSS
import "./Contact.css";

// Utils
import { vocabulary } from "@utils/vocabulary";

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

const Contact = () => {
    const { showToast } = useToast();

    // Vocabulary
    const i18n = {
        title: vocabulary("pages.contact.title"),
        summary: vocabulary("pages.contact.summary"),
        name: vocabulary("pages.contact.name"),
        email: vocabulary("pages.contact.email"),
        message: vocabulary("pages.contact.message"),
        send: vocabulary("pages.contact.send"),
        messageSuccess: vocabulary("pages.contact.messageSuccess"),
        messageError: vocabulary("pages.contact.messageError"),
    };

    const { data } = useContents(["seo"]);

    // Seo
    const seo = data?.seo?.contact;

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    useEffect(() => {
        const scriptId = "recaptcha-script";
        if (!document.getElementById(scriptId)) {
            const script = document.createElement("script");
            script.id = scriptId;
            script.src = `https://www.google.com/recaptcha/api.js?render=${env.VITE_GOOGLE_RECAPTCHA_SITE_KEY}`;
            script.async = true;
            script.defer = true;
            script.onload = () => console.log("reCAPTCHA carregado");
            document.body.appendChild(script);
        }
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!window.grecaptcha) {
            showToast(i18n.messageSuccess, "success");
            return;
        }

        const token = await window.grecaptcha.execute(env.VITE_GOOGLE_RECAPTCHA_SITE_KEY, { action: "contact" });

        try {
            await postEmail({ name, email, message, recaptchaToken: token });
            showToast(i18n.messageSuccess, "success");
            setName("");
            setEmail("");
            setMessage("");
        } catch (err: any) {
            showToast(i18n.messageError, "error");
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

                        ></textarea>
                    </div>
                    <button className="btn btn-primary" type="submit">
                        {i18n.send}
                    </button>
                </form>
            </section>
            <Block />
        </>
    );
};

export default Contact;
