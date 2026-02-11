import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Order } from '../models/order.model';
import { environment } from './../environments/environment';

@Injectable({
    providedIn: 'root'
})

export class OrderService {
    private http = inject(HttpClient);
    private apiUrl = `${environment.apiUrl}/api/orders`;

    getOrderById(id: string): Observable<Order> {
        return this.http.get<Order>(`${this.apiUrl}/${id}`);
    }

    getCustomerOrders(customerId: string): Observable<Order[]> {
        return this.http.get<Order[]>(`${this.apiUrl}/customer/${customerId}`);
    }

    getAllOrders(): Observable<Order[]> {
        return this.http.get<Order[]>(this.apiUrl);
    }
}