import { useState } from "react";

// CSS
import "./Contact.css";

// Translation
import { getVocabularyTranslation } from "../../components/I18n/I18n";

// Emailjs
import emailjs from "@emailjs/browser";

// Sweetalert 2
import Swal from "sweetalert2";

const Contact = () => {
    const [contactName, setContactName] = useState("");
    const [contactEmail, setContactEmail] = useState("");
    const [contactSubject, setContactSubject] = useState("");
    const [contactMessage, setContactMessage] = useState("");

    const messageSuccess = getVocabularyTranslation(
        "contact.messageSuccessTitle"
    );
    const messageError = getVocabularyTranslation("contact.messageErrorText");

    const submitForm = async (e: any) => {
        e.preventDefault();

        sendEmail(e);
    };

    const resetForm = () => {
        setContactName("");
        setContactEmail("");
        setContactSubject("");
        setContactMessage("");
    };

    // Send email
    const sendEmail = (e: any) => {
        emailjs
            .sendForm(
                "service_rgiw3sh",
                "template_6oi1nbt",
                e.target,
                "wNI4sprjKu_5ZAx8R"
            )
            .then(
                () => {
                    Swal.fire({
                        title: messageSuccess,
                        text: "",
                        icon: "success",
                        confirmButtonText: "Ok",
                        customClass: {
                            confirmButton: "btn btn-primary",
                        },
                    }).then((result: any) => {
                        if (result.isConfirmed) {
                            // Reset form
                            resetForm();
                        }
                    });
                },
                () => {
                    Swal.fire({
                        title: "Ups!",
                        text: messageError,
                        icon: "error",
                        confirmButtonText: "Ok",
                        customClass: {
                            confirmButton: "btn btn-primary",
                        },
                    }).then((result: any) => {
                        if (result.isConfirmed) {
                        }
                    });
                }
            );
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
                                        required
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
                                        required
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
                                required
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
                                required
                            ></textarea>
                        </div>
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
