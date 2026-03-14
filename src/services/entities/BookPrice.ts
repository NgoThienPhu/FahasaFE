import type { BaseEntity } from "./BaseEntity";

interface BasePrice extends BaseEntity {
    price: number;
    effectiveFrom: string;
    effectiveTo: string;
}

export type { BasePrice };