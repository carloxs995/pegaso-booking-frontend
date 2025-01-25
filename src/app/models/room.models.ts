export type RoomType = 'Standard' | 'Deluxe' | 'Suite' | 'Luxury' | 'Penthouse';

export const ROOM_TYPE_AVAILABLE: RoomType[] = ['Standard', 'Deluxe' , 'Suite', 'Luxury', 'Penthouse']

export interface IRoomDetails {
    id: string;
    type: RoomType;
    name: string;
    capacity: number;
    totalRooms: number;
    pricePerNight: number;
    amenities: string[];
    available: boolean;
    description?: string | undefined;
    images: string[];
}

export interface RoomFilters {
    serviceType: RoomType;
    guests: number;
    checkInDate: string;
    checkOutDate: string;
}
