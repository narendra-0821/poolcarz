import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RideService {
  private rides: any[] = []; 
  private currentUser: string = '';

  constructor() {
 
    this.rides = [
      {
        id: 1,
        pickUp: 'Ameerpet',
        destination: 'Office',
        date: '2025-06-17',
        seatsLeft: 3,
        name: 'John',
         car: 'Hyundai i20'

      },
      {
        id: 2,
        pickUp: 'Office',
        destination: 'Madhapur',
        date: '2025-06-17',
        seatsLeft: 2,
        name: 'Alice',
         car: 'Hyundai i20'
      },      {
        id: 3,
        pickUp: 'Ameerpet',
        destination: 'KPHB',
        date: '2025-06-17',
        seatsLeft: 3,
        name: 'Balu',
         car: 'BMW'

      },      {
        id: 1,
        pickUp: 'Ngaole',
        destination: 'Uppal',
        date: '2025-06-17',
        seatsLeft: 3,
        name: 'Raju',
         car: 'Audi'

      },
    ];
  }

  setCurrentUser(name: string) {
    this.currentUser = name;
  }

  getCurrentUser(): string {
    return this.currentUser;
  }

  addRide(ride: any) {
    ride.id = Date.now(); 
    this.rides.push(ride);
  }
  getRides(): any[] {
    return this.rides;
  }

  bookRide(rideId: number): boolean {
    const ride = this.rides.find(r => r.id === rideId);
    if (ride && ride.seatsLeft > 0) {
      ride.seatsLeft--;
      return true;
    }
    return false;
  }
  updateSeats(rideId: number, decrease: boolean = true) {
  const ride = this.rides.find((r) => r.id === rideId);
  if (ride) {
    if (decrease && ride.seatsLeft > 0) {
      ride.seatsLeft--;
    } else if (!decrease) {
      ride.seatsLeft++;
    }
  }
}

  cancelRide(rideId: number): void {
    const ride = this.rides.find(r => r.id === rideId);
    if (ride) {
      ride.seatsLeft++;
    }
  }
}
