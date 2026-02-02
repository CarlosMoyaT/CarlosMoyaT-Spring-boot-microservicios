export interface Order {
    orderId: string;
    customerId: string;
    eventId: number;
    eventName: string;
    quantity: number;
    totalAmount: number;
    orderDate: string;
    status: OrderStatus;
}

export enum OrderStatus {
    PENDING = 'PENDING',
    PROCESSING = 'PROCESSING',
    COMPLETED = 'COMPLETED',
    CANCELLED = 'CANCELLED'
}