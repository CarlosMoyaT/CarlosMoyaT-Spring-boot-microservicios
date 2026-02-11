import { Routes } from '@angular/router';
import { EventListComponent } from './components/event-list/event-list.component';
import { EventDetailComponent } from './components/event-detail/event-detail.component';
import { BookingFormComponent } from './components/booking-form/booking-form.component';
import { OrderListComponent } from './components/order-list/order-list.component';
import { HomeComponent } from './components/home/home.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'events', component: EventListComponent },
  { path: 'events/:id', component: EventDetailComponent },
  { path: 'booking/:id', component: BookingFormComponent },
  { path: 'orders', component: OrderListComponent },
  { path: '**', redirectTo: '/home' }
];
