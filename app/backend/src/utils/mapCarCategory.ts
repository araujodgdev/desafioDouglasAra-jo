import { CarCategory } from "@prisma/client";

export default function mapCarCategory(category: number): CarCategory {
    switch (category) {
        case 1: return CarCategory.COMPACT_HATCH;
        case 2: return CarCategory.MEDIUM_HATCH;
        case 3: return CarCategory.SEDAN;
        case 4: return CarCategory.VAN;
        case 5: return CarCategory.PICKUP;

        default: throw new Error('Invalid car category');
    }
}