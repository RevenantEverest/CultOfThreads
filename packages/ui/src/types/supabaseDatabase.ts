import type { Database } from '../database.types';

export type DatabaseItem<T extends keyof Database["public"]["Tables"]> = Database["public"]["Tables"][T];
