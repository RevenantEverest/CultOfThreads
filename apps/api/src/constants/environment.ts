import dotenv from 'dotenv';

dotenv.config();

export const NODE_ENV = process.env.NODE_ENV as string;
export const API_URL = process.env.API_URL as string;

export const API_PORT = process.env.API_PORT as string;
export const API_INTERNAL_ACCESS_SECRET = process.env.API_INTERNAL_ACCESS_SECRET as string;
export const TOKEN_SECRET = process.env.TOKEN_SECRET as string;
export const ORDER_TOKEN_SECRET = process.env.API_ORDER_TOKEN_SECRET as string;
export const FRONTEND_URL = process.env.FRONTEND_URL as string; // used for stripe checkout redirects

export const SUPABASE_URL = process.env.SUPABASE_URL as string;
export const SUPABASE_KEY = process.env.SUPABASE_KEY as string;
export const SUPABASE_SECRET = process.env.SUPABASE_SECRET as string;
export const SUPABASE_PROJECT_ID = process.env.SUPABASE_PROJECT_ID as string;
export const SUPABASE_DB_PASSWORD = process.env.SUPABASE_DB_PASSWORD as string;
export const SUPABASE_AUTH_URL = `${SUPABASE_URL}/auth/v1`;
export const SUPABASE_STORAGE_URL = `${SUPABASE_URL}/storage/v1/object/public/`;

export const STRIPE_TOKEN = process.env.STRIPE_TOKEN as string;
export const STRIPE_WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET as string;
export const STRIPE_SHIPPING_ID_STANDARD = process.env.STRIPE_SHIPPING_ID_STANDARD as string;
export const STRIPE_SHIPPING_ID_EXPRESS = process.env.STRIPE_SHIPPING_ID_EXPRESS as string;

export const SQUARE_APP_ID = process.env.SQUARE_APP_ID as string;
export const SQUARE_TOKEN = process.env.SQUARE_TOKEN as string;

export const ZOHO_CLIENT_ID = process.env.ZOHO_CLIENT_ID as string;
export const ZOHO_CLIENT_SECRET = process.env.ZOHO_CLIENT_SECRET as string;
export const ZOHO_ACCOUNT_ID = process.env.ZOHO_ACCOUNT_ID as string;
export const ZOHO_REFRESH_TOKEN = process.env.ZOHO_REFRESH_TOKEN as string;
export const ZOHO_EMAIL = process.env.ZOHO_EMAIL as string;

export const DATABASE = {
    HOST: process.env.DB_HOST as string,
    PORT: Number(process.env.DB_PORT as string),
    NAME: process.env.DB_NAME as string,
    USERNAME: process.env.DB_USERNAME as string,
    PASSWORD: SUPABASE_DB_PASSWORD
} as const;

export const DATABASE_URL = `postgresql://${DATABASE.USERNAME}:${DATABASE.PASSWORD}@${DATABASE.HOST}:${DATABASE.PORT}/postgres`;