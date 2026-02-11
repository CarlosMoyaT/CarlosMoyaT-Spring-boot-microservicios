import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  features = [
    {
      icon: 'search',
      title: 'Descubre Eventos',
      description: 'Encuentra los mejores eventos en tu ciudad'
    },
    {
      icon: 'confirmation_number',
      title: 'Reserva Fácil',
      description: 'Proceso de reserva rápido y seguro'
    },
    {
      icon: 'smartphone',
      title: 'Entradas Digitales',
      description: 'Recibe tus entradas directamente en tu email'
    },
    {
      icon: 'verified_user',
      title: 'Compra Segura',
      description: 'Transacciones protegidas y confiables'
    }
  ];

  constructor(private router: Router) {}

  exploreEvents(): void {
    this.router.navigate(['/events']);
  }
}