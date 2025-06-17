
import { Component, Input, Output, EventEmitter, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RideService } from "../services/ride.service";

@Component({
  selector: "app-ride-details",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./ride-details.component.html",
  styleUrls: ["./ride-details.component.css"],
})
export class RideDetailsComponent implements OnInit {
  @Input() ride: any;
  @Input() currentUser: string = "";
  @Output() cancelView = new EventEmitter<void>();
  @Output() bookingDone = new EventEmitter<void>();

  bookingConfirmed = false;
  bookingId = "";
  isOwnRide = false;

  constructor(private rideService: RideService) {}

  ngOnInit(): void {
    this.isOwnRide = this.ride?.name === this.currentUser;
  }

bookRide() {
  if (this.ride && !this.bookingConfirmed && !this.isOwnRide && this.ride.seatsLeft > 0) {
    this.rideService.updateSeats(this.ride.id, true);
    this.bookingConfirmed = true;
    this.bookingDone.emit();
    this.bookingId = Math.floor(100 + Math.random() * 900).toString();
  }
}


 cancelBooking() {
  if (this.ride && this.bookingConfirmed) {
    this.rideService.updateSeats(this.ride.id, false);
    this.bookingConfirmed = false;
    this.bookingId = "";
  }
}


  goBack() {
    this.cancelView.emit();
  }
}
