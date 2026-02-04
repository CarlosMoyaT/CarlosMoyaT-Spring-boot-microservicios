import { Inject, Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Event } from '../models/event.model';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class EventService {
    private http = inject(HttpClient);
    private apiUrl = `${environment.apiUrl}/api/events`;

    getEvents(): Observable<Event[]> {
        return this.http.get<Event[]>(this.apiUrl);
    }

    getEventById(id: number): Observable<Event> {
        return this.http.get<Event>(`${this.apiUrl}/${id}`);
    }

    getAvailableEvents(): Observable<Event[]> {
        return this.http.get<Event[]>(`${this.apiUrl}/available`);
    }
}