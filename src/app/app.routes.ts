import { Routes } from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { BookRideComponent } from "./book-ride/book-ride.component";
import { RideDetailsComponent } from "./ride-details/ride-details.component";
import { OfferRideComponent } from "./offer-ride/offer-ride.component";

export const routes: Routes = [
  { path:'', component: LoginComponent },
  { path: "book-ride", component: BookRideComponent },
  { path: "ride-details", component: RideDetailsComponent },
  { path: "offer-ride", component: OfferRideComponent },
];
