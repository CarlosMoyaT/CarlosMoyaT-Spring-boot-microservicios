exporte interface BookingRequest {
    eventId: number;
    customerId: string;
    quantity: number;
    customerEmail: string;
    customerName: string;
}

export interface BookingResponse {
    bookingId: string;
    eventId: number;
    customerId: string;
    quantity: number;
    totalAmout: number;
    bookingDate: string;
    status: BookingStatus;
}

export enum BookingStatus {
    PENDING = 'PENDING',
    CONFIRMED = 'CONFIRMED',
    CANCELLED = 'CANCELLED'
}