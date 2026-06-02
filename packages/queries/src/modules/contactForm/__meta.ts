import { ENV } from '~/constants';

export const BASE_URL = `${ENV.API_URL}/contact-form`;
export const KEYS = {
    all: ["contact_form"],
    lists: () => [...KEYS.all, "list"],
    details: (id: string) => [...KEYS.all, "detail", id]
};