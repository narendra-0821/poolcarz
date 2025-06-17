import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'rideFilter',
  standalone: true
})
export class RideFilterPipe implements PipeTransform {
  transform(rides: any[], criteria: string): any[] {
    if (!rides || criteria === 'All') return rides;

    if (criteria === 'To Office') {
      return rides.filter(ride => ride.destination?.toLowerCase() === 'office');
    }

    if (criteria === 'From Office') {
      return rides.filter(ride => ride.pickUp?.toLowerCase() === 'office');
    }

    if (criteria === 'Others') {
      return rides.filter(ride =>
        ride.pickUp?.toLowerCase() !== 'office' &&
        ride.destination?.toLowerCase() !== 'office'
      );
    }

    return rides;
  }
}
