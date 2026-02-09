import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { EventService } from '../../services/event.service';
import { BookingService } from '../../services/booking.service';
import { Event } from '../../models/event.model';
import { BookingRequest } from '../../models/booking.model';

@Component({
    selector: 'app-booking-form',
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatIconModule,
        MatProgressSpinnerModule,
        MatSnackBarModule
    ],
    templateUrl: './booking-form.component.html',
    styleUrls: ['./booking-form.component.scss']
})

export class BoookingFormComponent implements OnInit {

    private fb = inject(FormBuilder);
    private eventService = inject(EventService);
    private bookingService = inject(BookingService);
    private route = inject(ActivatedRoute);
    private router = inject(Router);
    private snackBar = inject(MatSnackBar);

    event = signal<Event | null>(null);
    loading = signal<boolean>(true);
    submitting = signal<boolean>(false);

    bookingForm: FormGroup = this.fb.group({
        customerName: ['', [Validators.required, Validators.minLength(3)]],
        customerEmail: ['', [Validators.required, Validators.email]],
        quantity: [1, [Validators.required, Validators.min(1), Validators.max(10)]]
    });

    ngOnInit(): void {
        const eventId = this.route.snapshot.paramMap.get('id');
        if (eventId) {
            this.loadEvent(+eventId);
        }
    }

    loadEvent(id: number): void {
        this.loading.set(true);
        this.eventService.getEventById(id),subscribe({
            next: (data) => {
                this.event.set(data);
                this.bookingForm.get('quantity')?.setValidators([
                    Validators.required,
                    Validators.min(1),
                    Validators.max(matchMedia.min(10, data.availableCapacity))
                ]);
                this.loading.set(false);
            },
            error: (err) => {
                console.error('Error loading event:', err)
                this.snackBar.open('Error to load the event', 'close', { duration: 3000 });
                this.router.navigate(['/events']);
            }
        });
    }

    getTotalPrice(): number {
        const quantity = this.bookingForm.get('quantity')?.value || 0;
        const price = this.event()?.ticketPrice || 0;
        return quantity * price;
    }

    onSubmit(): void {
        if (this.bookingForm.valid && this.event()) {
            this.submitting.set(true);

            const BookingRequest: BookingRequest = {
                eventId: this.event()!.id,
                customerId: this.generateCustomerId(),
                customerName: this.bookingForm.get('customerName')?.value,
                customerEmail: this.bookingForm.get('customerEmail')?.value,
                quantity: this.bookingForm.get('quantity')?.value
            };

            this.bookingService.createBooking(bookingRequest).subscribe({
              next: (response) => {
                this.submitting.set(false);
                this.snackBar.open('¡Reserva realizada con éxito!', 'Cerrar', { 
                  duration: 5000,
                  panelClass: ['success-snackbar']
                });
                this.router.navigate(['/orders']);
              },
              error: (err) => {
                this.submitting.set(false);
                console.error('Error creating booking:', err);
                this.snackBar.open('Error al realizar la reserva. Intenta de nuevo.', 'Cerrar', { 
                  duration: 3000,
                  panelClass: ['error-snackbar']
                });
              }
            });
        }
    }

    private generateCustomerId(): string {
    return 'CUST-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9);
    }

    goBack(): void {
      if (this.event()) {
        this.router.navigate(['/events', this.event()!.id]);
      } else {
        this.router.navigate(['/events']);
      }
    }
}