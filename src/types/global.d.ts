interface Grecaptcha {
    execute: (siteKey: string, options: { action: string }) => Promise<string>;
}

interface Window {
    grecaptcha: Grecaptcha;
}
