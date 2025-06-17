import { Component, OnInit } from '@angular/core';
import { RideService } from '../services/ride.service';
import { Router } from '@angular/router';
import { RideFilterPipe } from './ride-filter.pipe';
import { MouseHoverDirective } from '../mouse-hover.directive';
import { RideDetailsComponent } from '../ride-details/ride-details.component';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-book-ride',
  standalone: true,
  imports: [
    NgFor,
    NgIf,
    FormsModule,
    MouseHoverDirective,
    RideFilterPipe,
    RideDetailsComponent
  ],
  templateUrl: './book-ride.component.html',
  styleUrls: ['./book-ride.component.css']
})
export class BookRideComponent implements OnInit {
  selectedRide: any = null;
  filterPickUp = '';
  filterDestination = '';
  filterDate = '';
  filterCriteria = 'All';

  filteredRides: any[] = [];
  currentUser: string = '';

  constructor(private rideService: RideService, private router: Router) {}

  ngOnInit(): void {
    this.currentUser = this.rideService.getCurrentUser();
    this.filteredRides = this.rideService.getRides();
  }

  setFilter(criteria: string) {
    this.filterCriteria = criteria;
    if (criteria === 'All') this.clearFilters();
  }

  applyFilters() {
    const allRides = this.rideService.getRides();
    this.filteredRides = allRides.filter((ride) => {
      const matchesPickUp = this.filterPickUp ? ride.pickUp.toLowerCase().includes(this.filterPickUp.toLowerCase()) : true;
      const matchesDestination = this.filterDestination ? ride.destination.toLowerCase().includes(this.filterDestination.toLowerCase()) : true;
      const matchesDate = this.filterDate ? ride.date === this.filterDate : true;
      return matchesPickUp && matchesDestination && matchesDate;
    });
  }

  clearFilters() {
    this.filterPickUp = '';
    this.filterDestination = '';
    this.filterDate = '';
    this.filteredRides = this.rideService.getRides();
  }

  selectRide(ride: any) {
    this.selectedRide = ride;
  }

  offerRide() {
    this.router.navigate(['/offer-ride']);
  }

  handleBookingDone() {
    this.filteredRides = this.rideService.getRides();
    // this.selectedRide = null;
  }

  cancelDetailsView() {
    this.selectedRide = null;
  }
}
