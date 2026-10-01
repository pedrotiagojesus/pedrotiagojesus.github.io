import "i18next";
import type pt from "../locales/pt.json";

// Types t()'s keys against the pt bundle, so a missing or misspelled key is a
// compile error instead of the key itself rendering on the page.
declare module "i18next" {
    interface CustomTypeOptions {
        resources: { translation: typeof pt };
    }
}
