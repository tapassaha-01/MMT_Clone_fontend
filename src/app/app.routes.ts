import { Routes } from '@angular/router';
import { HomeComponent } from './Components/home/home.component';
import { SignupComponent } from './Components/signup/signup.component';
import { LoginComponent } from './Components/login/login.component';
import { ProfileComponent } from './Components/profile/profile.component';
import { PaymentComponent } from './Components/payment/payment.component';
import { FlightComponent } from './Components/Vehicles/flight/flight.component';
import { TrainComponent } from './Components/Vehicles/train/train.component';
import { BusComponent } from './Components/Vehicles/bus/bus.component';
import { HotelComponent } from './Components/Vehicles/hotel/hotel.component';
import { CabComponent } from './Components/Vehicles/cab/cab.component';
import { ViewFlightsComponent } from './Components/viewTransports/view-flights/view-flights.component';
import { ViewTrainsComponent } from './Components/viewTransports/view-trains/view-trains.component';
import { FlightBookingComponent } from './Components/TransportBooking/flight-booking/flight-booking.component';
import { TrainBookingComponent } from './Components/TransportBooking/train-booking/train-booking.component';
import { ReviewBookingComponent } from './Components/review-booking/review-booking.component';
import { WelcomeComponent } from './Components/welcome/welcome.component';
import { ViewAdminComponent } from './Components/Admin/AdminControl/view-admin/view-admin.component';


export const routes: Routes = [
    {path: '', redirectTo:'welcome', pathMatch:'full'},
    {path: 'welcome', component: WelcomeComponent},
    {path: 'homeview', component: HomeComponent},
    {path: 'signup', component: SignupComponent},
    {path: 'login', component: LoginComponent},
    {path: 'profile', component: ProfileComponent},
    {path: 'admin', component: ViewAdminComponent},
    {path: 'payment', component: PaymentComponent},
    {path: 'reviewBooking', component: ReviewBookingComponent },
    {path: 'flight', component: FlightComponent},
    {path: 'train', component: TrainComponent},
    {path: 'bus', component: BusComponent},
    {path: 'hotel', component: HotelComponent},
    {path: 'cab', component: CabComponent},

    
    {path: 'viewFlight', component: ViewFlightsComponent},
    {path: 'viewTrain', component: ViewTrainsComponent},

    {path: 'bookFlight', component: FlightBookingComponent},
    {path: 'bookTrain', component: TrainBookingComponent}, 
    {path: '**', component: HomeComponent}
];
