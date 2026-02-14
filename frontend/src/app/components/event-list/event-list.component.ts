import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { EventService } from '../../services/event.service';
import { EventModel } from '../../models/event.model';


@Component({
    selector: 'app-event-list',
    standalone: true,
    imports: [
        CommonModule,
        MatCardModule,
        MatButtonModule,
        MatChipsModule,
        MatProgressSpinnerModule,
        MatIconModule
    ],
    templateUrl: './event-list.component.html',
    styleUrls: ['./event-list.component.scss']
})

export class EventListComponent implements OnInit {
    private eventService = inject(EventService);
    private router = inject(Router);

    events = signal<EventModel[]>([]);
    loading = signal<boolean>(true);
    error = signal<string | null>(null);

    ngOnInit(): void {
        this.loadEvents();
    }

    loadEvents(): void {
        this.loading.set(true);
        this.eventService.getAvailableEvents().subscribe({
            next: (data) => {
                this.events.set(data);
                this.loading.set(false);
            },
            error: (err) => {
                this.error.set('Error loading events. Please try it again.');
                this.loading.set(false);
                console.error('Error loading events:', err);
            }
        });
    }


viewEventDetail(eventId: number): void {
    this.router.navigate(['/events', eventId]);
}

getAvailabilityPercentage(event: EventModel): number {
    return (event.availableCapacity / event.totalCapacity) * 100;
}

getAvailabilityClass(percentage: number): string {
    if (percentage > 50) return 'high';
    if (percentage > 20) return 'medium';
    return 'low';
}
}
