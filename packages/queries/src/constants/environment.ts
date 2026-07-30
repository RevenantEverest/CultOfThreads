export function getEnvVar(key: string) {
    if(typeof process !== "undefined" && process.env) {
        if(process.env[key]) return process.env[key];
    }

    if(typeof import.meta !== "undefined" && (import.meta as any).env) { //eslint-disable-line
        return (import.meta as any).env[key] as string; //eslint-disable-line
    }

    return undefined;
};

export const API_URL: string = getEnvVar("NEXT_PUBLIC_API_URL") || getEnvVar("VITE_API_URL") || getEnvVar("API_URL") || "http://localhost:3001";