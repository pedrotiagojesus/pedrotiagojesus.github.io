import { useRef, useState } from "react";

// CSS
import "./Contact.css";

// Translation
import { getVocabularyTranslation } from "../../components/I18n/I18n";

// Emailjs
import emailjs from "@emailjs/browser";

const Contact = () => {
    const [contactName, setContactName] = useState("");
    const [contactEmail, setContactEmail] = useState("");
    const [contactSubject, setContactSubject] = useState("");
    const [contactMessage, setContactMessage] = useState("");

    const captchaRef = useRef(null);
    const [captchaToken, setCaptchaToken] = useState("");

    const handleCaptchaLoad = () => {
        if (window.grecaptcha && captchaRef.current) {
            window.grecaptcha.render(captchaRef.current, {
                sitekey: "6LdarXMqAAAAAFqf7rFsBplQq-uXdGgeQTegqdam", //
                callback: setCaptchaToken,
            });
        }
    };

    const submitForm = async (e: any) => {
        e.preventDefault();

        if (!captchaToken) {
            alert("Por favor, complete o reCAPTCHA");
            return;
        }

        try {
            // Envia o token diretamente ao servidor do Google para verificação
            const response = await fetch(
                `https://www.google.com/recaptcha/api/siteverify?secret=SUA_SECRET_KEY_AQUI&response=${captchaToken}`,
                {
                    method: "POST",
                }
            );

            const data = await response.json();

            if (data.success) {
                emailjs
                    .sendForm(
                        "service_rgiw3sh",
                        "template_6oi1nbt",
                        e.target,
                        "wNI4sprjKu_5ZAx8R"
                    )
                    .then(
                        (response) => {
                            console.log(
                                "SUCCESS!",
                                response.status,
                                response.text
                            );
                        },
                        (error) => {
                            console.log("FAILED...", error);
                        }
                    );

                // Reset form
                setContactName("");
                setContactEmail("");
                setContactSubject("");
                setContactMessage("");
            } else {
                alert("Falha na verificação do reCAPTCHA. Tente novamente.");
            }
        } catch (error) {
            console.error("Erro na verificação do reCAPTCHA:", error);
        }
    };

    return (
        <div className="container">
            <div id="contact-page" className="card">
                <div className="card-body">
                    <h2>{getVocabularyTranslation("contact.title")}</h2>
                    <p>{getVocabularyTranslation("contact.text")}</p>
                    <form method="post" onSubmit={(e) => submitForm(e)}>
                        <div className="row">
                            <div className="col-lg-6">
                                <div className="mb-3">
                                    <label
                                        htmlFor="contact-name"
                                        className="form-label"
                                    >
                                        {getVocabularyTranslation(
                                            "contact.labelName"
                                        )}
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="contact-name"
                                        name="contact-name"
                                        aria-describedby={getVocabularyTranslation(
                                            "contact.descriptionName"
                                        )}
                                        onChange={(e) =>
                                            setContactName(e.target.value)
                                        }
                                        value={contactName}
                                    />
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <div className="mb-3">
                                    <label
                                        htmlFor="contact-email"
                                        className="form-label"
                                    >
                                        {getVocabularyTranslation(
                                            "contact.labelEmail"
                                        )}
                                    </label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        id="contact-email"
                                        name="contact-email"
                                        aria-describedby={getVocabularyTranslation(
                                            "contact.descriptionEmail"
                                        )}
                                        onChange={(e) =>
                                            setContactEmail(e.target.value)
                                        }
                                        value={contactEmail}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="mb-3">
                            <label
                                htmlFor="contact-subject"
                                className="form-label"
                            >
                                {getVocabularyTranslation(
                                    "contact.labelSubject"
                                )}
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="contact-subject"
                                name="contact-subject"
                                aria-describedby={getVocabularyTranslation(
                                    "contact.descriptionSubject"
                                )}
                                onChange={(e) =>
                                    setContactSubject(e.target.value)
                                }
                                value={contactSubject}
                            />
                        </div>
                        <div className="mb-3">
                            <label
                                htmlFor="contact-message"
                                className="form-label"
                            >
                                {getVocabularyTranslation(
                                    "contact.labelMessage"
                                )}
                            </label>
                            <textarea
                                className="form-control"
                                id="contact-message"
                                name="contact-message"
                                aria-describedby={getVocabularyTranslation(
                                    "contact.descriptionMessage"
                                )}
                                rows={10}
                                onChange={(e) =>
                                    setContactMessage(e.target.value)
                                }
                                value={contactMessage}
                            ></textarea>
                        </div>
                        <div ref={captchaRef} onLoad={handleCaptchaLoad}></div>
                        <button type="submit" className="btn btn-primary">
                            {getVocabularyTranslation("contact.submit")}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Contact;
