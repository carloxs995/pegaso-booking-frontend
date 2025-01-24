export interface IBookingsFiltersListSchema {
    checkInDate?: string | undefined;
    checkOutDate?: string | undefined;
    serviceType?: "Standard" | "Deluxe" | "Suite" | "Luxury" | "Penthouse" | undefined;
    pagination?: {
        continuation: string | null;
        pageSize: number;
    } | undefined;
}
