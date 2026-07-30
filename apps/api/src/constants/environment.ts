import dotenv from 'dotenv';

dotenv.config();

export const API_URL = process.env.API_URL as string;

export const API_PORT = process.env.API_PORT as string;
export const TOKEN_SECRET = process.env.TOKEN_SECRET as string;

export const SUPABASE_URL = process.env.SUPABASE_URL as string;
export const SUPABASE_KEY = process.env.SUPABASE_KEY as string;
export const SUPABASE_SECRET = process.env.SUPABASE_SECRET as string;
export const SUPABASE_PROJECT_ID = process.env.SUPABASE_PROJECT_ID as string;
export const SUPABASE_DB_PASSWORD = process.env.SUPABASE_DB_PASSWORD as string;
export const SUPABASE_AUTH_URL = `${SUPABASE_URL}/auth/v1`;

const hostRegex = /^https?:\/\/([^:/]+)/gi;
export const DATABASE = {
    HOST: hostRegex.exec(SUPABASE_URL)![1] as string,
    PORT: Number(process.env.DB_PORT as string),
    NAME: process.env.DB_NAME as string,
    USERNAME: process.env.DB_USERNAME as string,
    PASSWORD: SUPABASE_DB_PASSWORD
} as const;

export const DATABASE_URL = `postgresql://${DATABASE.USERNAME}:${DATABASE.PASSWORD}@${DATABASE.HOST}:${DATABASE.PORT}/postgres`;