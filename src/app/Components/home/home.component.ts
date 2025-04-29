import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { CommonbarComponent } from "../commonbar/commonbar.component";
import { FlightComponent } from "../Vehicles/flight/flight.component";
import { CustomerbarComponent } from "../customerbar/customerbar.component";
import { TrainComponent } from "../Vehicles/train/train.component";
import { BusComponent } from "../Vehicles/bus/bus.component";
import { HotelComponent } from "../Vehicles/hotel/hotel.component";
import { CabComponent } from "../Vehicles/cab/cab.component";

@Component({
  selector: 'app-home',
  imports: [CommonModule, CommonbarComponent, FlightComponent, CustomerbarComponent, TrainComponent, BusComponent, HotelComponent, CabComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  title = 'Demo Travel';
  selectedTransport: string = 'flight';
  loginStatus: boolean = false;

  constructor(@Inject(PLATFORM_ID) private platformId: any) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      const temp = localStorage.getItem('jwtToken');
      if (temp != null) {
        this.loginStatus = true;
      }
    }
  }

  OnTransportSelection(name: string) {
    this.selectedTransport = name;
  }
}