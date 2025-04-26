import { Component, inject, OnInit } from '@angular/core';
import { IFlightDetails } from '../../../Interface/IFlightDetails';
import { CommonModule, NgFor } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { CustomerbarComponent } from "../../customerbar/customerbar.component";

@Component({
  selector: 'app-view-flights',
  imports: [CommonModule, NgFor, CustomerbarComponent],
  templateUrl: './view-flights.component.html',
  styleUrl: './view-flights.component.css'
})
export class ViewFlightsComponent implements OnInit {

  flightDetails: IFlightDetails[]=[];
  private activatedRoute = inject(ActivatedRoute);

  // departure: string = "Delhi";
  // destination: string = "Kolkata";
  // journeyDate: Date = new Date(2025, 4, 18);

  departure: string = this.activatedRoute.snapshot.params['departure'];
  destination: string = this.activatedRoute.snapshot.params['destination'];
  journeyDate: Date = this.activatedRoute.snapshot.params['journeyDate'];

    flight1: IFlightDetails ={
      travelCompanyName: 'AirIndia',
      departureTime: new Date(2025, 4, 18, 10, 15),
      totalTime: 2.5,
      arrivalTime: new Date(2025, 4, 18, 13, 15),
      price: 25000
    }
  
    flight2: IFlightDetails ={
      travelCompanyName: 'JetAirways',
      departureTime: new Date(2025, 4, 18, 16, 15),
      totalTime: 4.5,
      arrivalTime: new Date(2025, 4, 18, 20, 15),
      price: 30000
    }
  
    constructor(){
      this.flightDetails = [this.flight1, this.flight2];
    }
  
    ngOnInit(): void {
        
    }
}
