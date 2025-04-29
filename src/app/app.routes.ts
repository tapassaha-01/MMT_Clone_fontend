import { Routes } from '@angular/router';
import { HomeComponent } from './Components/home/home.component';
import { SignupComponent } from './Components/signup/signup.component';
import { LoginComponent } from './Components/login/login.component';
import { ProfileComponent } from './Components/profile/profile.component';
import { PassengerBookingComponent } from './Components/passenger-booking/passenger-booking.component';
import { PaymentComponent } from './Components/payment/payment.component';
import { FlightComponent } from './Components/Vehicles/flight/flight.component';
import { TrainComponent } from './Components/Vehicles/train/train.component';
import { BusComponent } from './Components/Vehicles/bus/bus.component';
import { HotelComponent } from './Components/Vehicles/hotel/hotel.component';
import { CabComponent } from './Components/Vehicles/cab/cab.component';
import { ViewFlightsComponent } from './Components/viewTransports/view-flights/view-flights.component';
import { ViewTrainsComponent } from './Components/viewTransports/view-trains/view-trains.component';


export const routes: Routes = [
    {path: '', redirectTo:'homeview', pathMatch:'full'},
    {path: 'homeview', component: HomeComponent},
    {path: 'signup', component: SignupComponent},
    {path: 'login', component: LoginComponent},
    {path: 'profile', component: ProfileComponent},
    {path: 'booking', component: PassengerBookingComponent},
    {path: 'payment', component: PaymentComponent},
    {path: 'flight', component: FlightComponent},
    {path: 'train', component: TrainComponent},
    {path: 'bus', component: BusComponent},
    {path: 'hotel', component: HotelComponent},
    {path: 'cab', component: CabComponent},

    
    {path: 'viewFlight/: departure/: destination/: journeyDate', component: ViewFlightsComponent},
    {path: 'viewTrain', component: ViewTrainsComponent},
    // {path: '**', component: HomeComponent}
];
