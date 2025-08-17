import type { DatabaseItem } from '@repo/ui';

export type ProductDetailsStatus = "ACTIVE" | "DRAFT";

export type ProductDetailsRow = DatabaseItem<"product_details">["Row"];
export interface ProductDetails extends ProductDetailsRow {
    status: string | ProductDetailsStatus
};