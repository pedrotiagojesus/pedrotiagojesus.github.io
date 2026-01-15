import { env } from "@config/env";
import ReactGA from "react-ga4";

export const initGA = () => {
    console.log(env.VITE_PRODUCTION);
    console.log(env.VITE_GA_ID);


    if (env.VITE_PRODUCTION && env.VITE_GA_ID) {
        ReactGA.initialize(env.VITE_GA_ID);
    }
};
