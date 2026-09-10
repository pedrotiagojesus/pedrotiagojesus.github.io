import axios from "axios";

// Config
import { env } from "@config/env";

// Errors
import { normalizeApiError } from "./errors";

const client = axios.create({
    baseURL: env.VITE_ENDPOINT,
    timeout: env.VITE_TIMEOUT,
    headers: {
        "Content-Type": "application/json",
        "X-Api-Key": env.VITE_API_KEY,
    },
});

client.interceptors.response.use(
    (response) => response,
    (error) => {
        const apiError = normalizeApiError(error);

        if (import.meta.env.DEV) {
            console.error("[API error]", apiError);
        }

        return Promise.reject(apiError);
    }
);

export default client;
