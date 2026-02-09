import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BookingRequest, BookingResponse } from '../models/booking.model';
import { environment } from './../environments/environment';

@Injectable({
    providedIn: 'root'
})

export class BookingService {
    private http = inject(HttpClient);
    private apiUrl = `${environment.apiUrl}/api/bookings`;



    createBooking(booking: BookingRequest): Observable<BookingResponse> {
    return this.http.post<BookingResponse>(this.apiUrl, booking);
    }

    getBookingById(id: string): Observable<BookingResponse> {
    return this.http.get<BookingResponse>(`${this.apiUrl}/${id}`);
    }

    getCustomerBookings(customerId: string): Observable<BookingResponse[]> {
    return this.http.get<BookingResponse[]>(`${this.apiUrl}/customer/${customerId}`);
    }
}
