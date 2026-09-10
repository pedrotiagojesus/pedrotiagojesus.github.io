import axios from "axios";

export interface ApiError {
    status?: number;
    message: string;
    requestId?: string;
    isNetworkError: boolean;
}

export const normalizeApiError = (error: unknown): ApiError => {
    if (axios.isAxiosError(error)) {
        const data = error.response?.data as { message?: string; error?: string; requestId?: string } | undefined;

        return {
            status: error.response?.status,
            message: data?.message ?? data?.error ?? error.message,
            requestId: data?.requestId,
            isNetworkError: !error.response,
        };
    }

    return {
        message: error instanceof Error ? error.message : "Unknown error",
        isNetworkError: false,
    };
};
