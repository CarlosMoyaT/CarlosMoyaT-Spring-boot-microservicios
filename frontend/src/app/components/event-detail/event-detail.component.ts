import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDividerModule } from '@angular/material/divider';
import { EventService } from '../../services/event.service';
import { EventModel } from '../../models/event.model';

@Component({
    selector: 'app-event-detail',
    standalone: true,
    imports: [
        CommonModule,
        MatCardModule,
        MatButtonModule,
        MatIconModule,
        MatChipsModule,
        MatProgressSpinnerModule,
        MatDividerModule
    ],
    templateUrl: './event-detail.component.html',
    styleUrls: ['./event-detail.component.scss']
})

export class EventDetailComponent implements OnInit {

    private eventService = inject(EventService);
    private route = inject(ActivatedRoute);
    private router = inject(Router);

    event = signal<Event | null>(null);
    loading = signal<boolean>(true);
    error = signal<string | null>(null);

    ngOnInit(): void {
        const eventId = this.route.snapshot.paramMap.get('id');
        if (eventId) {
            this.loadEvent(+eventId);
        }
    }

    loadEvent(id: number): void {
        this.loading.set(true);
        this.eventService.getEventById(id).subscribe({
            next: (data) => {
                this.event.set(data);
                this.loading.set(false);
            },
            error: (err) => {
                this.error.set('Error load the event. Please try it again');
                this.loading.set(false);
                console.error('Error loading event:', err);
            }
        });
    }

    bookEvent(): void {
        const eventData = this.event();
        if (eventData) {
            this.router.navigate(['/booking', eventData.id]);
        }
    }

    goBack(): void {
        this.router.navigate(['/events']);
    }

    getAvailabilityPercentage(event: Event): number {
    return (event.availableCapacity / event.totalCapacity) * 100;
    }

    getAvailabilityClass(percentage: number): string {
    if (percentage > 50) return 'high';
    if (percentage > 20) return 'medium';
    return 'low';
    }

}