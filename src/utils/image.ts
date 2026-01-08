import { env } from "@config/env";

export const getProjectImage = (image: string) => {
    return env.VITE_ENDPOINT_PUBLIC.concat("uploads/projects/", image)
};
