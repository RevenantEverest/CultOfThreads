import { AxiosError } from 'axios';

export function extractErrorMessage(error: unknown): string | undefined {
    if(
        error instanceof AxiosError && 
        error.response && 
        error.response.data &&
        error.response.data.message
    ) {
        return error.response.data.message;
    }

    if(
        typeof error === 'object' && error !== null && 'message' in error
    ) {
        return error.message as string;
    }
};