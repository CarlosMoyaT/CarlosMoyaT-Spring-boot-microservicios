export interface EventModel {
    id: number;
    name: string;
    description: string;
    eventDate: string;
    ticketPrice: number;
    availableCapacity: number;
    totalCapacity: number;
    venue: Venue;
    imageUrl?: string;
}

export interface Venue {
    id: number;
    name: string;
    location: string;
    city: string;
    capacity: number;
}