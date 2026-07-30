export function getApiUrl(): string | undefined {
  if (typeof process !== "undefined" && process.env && process.env.NEXT_PUBLIC_API_URL) {
    return process.env.NEXT_PUBLIC_API_URL;
  }

  if (typeof import.meta !== "undefined" && (import.meta as any).env && (import.meta as any).env.VITE_API_URL) { //eslint-disable-line
    return (import.meta as any).env.VITE_API_URL; //eslint-disable-line
  }

  if (typeof process !== "undefined" && process.env && process.env.API_URL) {
    return process.env.API_URL;
  }

  return undefined;
}

export const API_URL: string = getApiUrl() || "http://localhost:3001";