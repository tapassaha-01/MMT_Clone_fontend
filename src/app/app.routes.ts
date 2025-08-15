import { Routes } from '@angular/router';
import { authGuard } from './Services/auth.guard';

export const routes: Routes = [
    {path: '', redirectTo:'welcome', pathMatch:'full'},

    {path: 'welcome', loadComponent: () => import('./Components/welcome/welcome.component').then(m => m.WelcomeComponent)},

    {path: 'homeview', loadComponent: () => import('./Components/home/home.component').then(m => m.HomeComponent)},

    {path: 'signup', loadComponent: () => import('./Components/signup/signup.component').then(m => m.SignupComponent)},

    {path: 'login', loadComponent: () => import('./Components/login/login.component').then(m => m.LoginComponent)},

    // Can't iplement auth guard here as following components are required to be loaded without authentication
    {path: 'flight', loadComponent: () => import('./Components/Vehicles/flight/flight.component').then(m => m.FlightComponent)},
    
    {path: 'train', loadComponent: () => import('./Components/Vehicles/train/train.component').then(m => m.TrainComponent)},
    
    {path: 'bus', loadComponent: () => import('./Components/Vehicles/bus/bus.component').then(m => m.BusComponent)},
    
    {path: 'hotel', loadComponent: () => import('./Components/Vehicles/hotel/hotel.component').then(m => m.HotelComponent)},
    
    {path: 'cab', loadComponent: () => import('./Components/Vehicles/cab/cab.component').then(m => m.CabComponent)},
    
    {path: 'forgotPassword', loadComponent: () => import('./Components/forgot-password/forgot-password.component').then(m => m.ForgotPasswordComponent)},
    
    {path: 'viewFlight', loadComponent: () => import('./Components/viewTransports/view-flights/view-flights.component').then(m => m.ViewFlightsComponent)},
    
    {path: 'viewTrain', loadComponent: () => import('./Components/viewTransports/view-trains/view-trains.component').then(m => m.ViewTrainsComponent)},

    {   
        path: 'profile', 
        loadComponent: () => import('./Components/profile/profile.component').then(m => m.ProfileComponent),
        canActivate: [authGuard] // Protect profile route with authGuard
    },

    {
        path: 'admin', 
        loadComponent: () => import('./Components/Admin/AdminControl/view-admin/view-admin.component').then(m => m.ViewAdminComponent),
        canActivate: [authGuard] // Protect admin route with authGuard
    },
    
    {
        path: 'payment', 
        loadComponent: () => import('./Components/payment/payment.component').then(m => m.PaymentComponent),
        canActivate: [authGuard] // Protect payment route with authGuard
    },
    
    {
        path: 'reviewBooking', 
        loadComponent: () => import('./Components/review-booking/review-booking.component').then(m => m.ReviewBookingComponent),
        canActivate: [authGuard] // Protect reviewBooking route with authGuard
    },

    {
        path: 'bookFlight', 
        loadComponent: () => import('./Components/TransportBooking/flight-booking/flight-booking.component').then(m => m.FlightBookingComponent), 
        canActivate: [authGuard] // Protect bookFlight route with authGuard
    },
    
    {
        path: 'bookTrain', 
        loadComponent: () => import('./Components/TransportBooking/train-booking/train-booking.component').then(m => m.TrainBookingComponent),
        canActivate: [authGuard] // Protect bookTrain route with authGuard
    }, 
    
    
    {path: '**', loadComponent: () => import('./Components/home/home.component').then(m => m.HomeComponent)}
];
