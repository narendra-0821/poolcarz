import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RideService } from '../services/ride.service';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-offer-ride',
  standalone: true,
  imports: [FormsModule, NgIf],
  templateUrl: './offer-ride.component.html',
  styleUrls: ['./offer-ride.component.css']
})
export class OfferRideComponent {
  name = '';
  start = '';
  end = '';
  car = '';
  seats: number | null = null;
  successMessage = '';
  seatError = '';

  constructor(private rideService: RideService, private router: Router) {}

  validateSeats(): boolean {
    if (this.seats === null || this.seats < 1 || this.seats > 7) {
      this.seatError = 'Seats should be greater than 0 and less than 8';
      return false;
    }
    this.seatError = '';
    return true;
  }

  submitRide() {
    if (!this.name || !this.start || !this.end || !this.car || !this.validateSeats()) {
      this.successMessage = 'Please fill out all fields correctly.';
      return;
    }

    const ride = {
      id: Date.now(),
      offerId: 'OF' + Math.floor(Math.random() * 1000),
      name: this.name,
      car: this.car,
      seatsLeft: this.seats,
      pickUp: this.start,
      destination: this.end,
      date: new Date().toISOString().split('T')[0],
    };

    this.rideService.setCurrentUser(this.name);
    this.rideService.addRide(ride);
    this.successMessage = '✅ Added Successfully!';
    setTimeout(() => this.router.navigate(['/book-ride']), 2000);
  }

  goBack() {
    this.router.navigate(['/book-ride']);
  }
}
