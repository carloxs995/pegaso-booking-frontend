import { RoomType } from "./room.models";

export type BookingStatus = 'pending' | 'confirmed' | 'cancelled' | 'completed';

export type PaymentMethod = 'credit_card' | 'paypal' | 'cash';

export interface IBookingDetails {
    id: string;
    customerFirstName: string;
    customerLastName: string;
    customerEmail: string;
    customerPhone: string;
    serviceName: RoomType;
    quantityGuests: number;
    checkInDate: string;
    checkOutDate: string;
    notes?: string;
    createdAt: string;
    updatedAt: string;
    isPaid: boolean;
    status: BookingStatus;
    paymentMethod: PaymentMethod;
    servicePrice: number;
    createdBy: string;
}

export interface IBookingsFiltersListSchema {
    checkInDate?: string | undefined;
    checkOutDate?: string | undefined;
    serviceName?: RoomType;
    pagination?: {
        continuation: string | null;
        pageSize: number;
    } | undefined;
    isPaid?: boolean;
}

export interface IBookingListResponse {
    data: {
        items: IBookingDetails[];
        continuation: string;
        isLastPage: boolean;
        totalCount: number;
    }
}
