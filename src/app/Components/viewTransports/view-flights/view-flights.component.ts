import { Component, inject, OnInit } from '@angular/core';
import { IFlightDetails } from '../../../Interface/IFlightDetails';
import { CommonModule, NgFor } from '@angular/common';
import { Router } from '@angular/router';
import { CustomerbarComponent } from "../../customerbar/customerbar.component";

@Component({
  selector: 'app-view-flights',
  imports: [CommonModule, NgFor, CustomerbarComponent],
  templateUrl: './view-flights.component.html',
  styleUrl: './view-flights.component.css'
})
export class ViewFlightsComponent implements OnInit {

  private route = inject(Router);
  allDetailsObj: any;

  departure: string = "";
  destination: string = "";
  journeyDate: Date = new Date();

    flight1: IFlightDetails ={
      travelCompanyName: 'AirIndia',
      departureDate: new Date(2025, 5, 10, 10, 15),
      totalTime: 2.5,
      arrivalDate: new Date(2025, 5, 11, 13, 15),
      price: 25000
    }
  
    flight2: IFlightDetails ={
      travelCompanyName: 'JetAirways',
      departureDate: new Date(2025, 7, 18, 16, 15),
      totalTime: 4.5,
      arrivalDate: new Date(2025, 7, 19, 20, 15),
      price: 30000
    }
  
    flightDetails = [this.flight1, this.flight2];

    // have to change this drastically as i need get method for the flight details 
    // have to add sessionstorage.getitem and then parse it to get the object and then use it in the constructor
    constructor(){
      
    }
  
    ngOnInit(): void {
      var allDetails = sessionStorage.getItem('allDetails');
      if (allDetails) {
        this.allDetailsObj = JSON.parse(allDetails);
        }

    this.departure = this.allDetailsObj.startFrom; // origin and destination both has to be fetched from the database
    this.destination = this.allDetailsObj.endTo; // origin and destination both has to be fetched from the database
    this.journeyDate = this.allDetailsObj.startingDate; // start date will depend upon the transport and destination however as of now we are taking it from the session storage

    }


// these methods are alsoo not complete, as there are no methods in service.ts thus printing it in console
    onBookFlight(flight: IFlightDetails) {
      this.allDetailsObj.startingDate=flight.departureDate; // Update the starting date with the selected flight's departure date
      this.allDetailsObj.endingDate=flight.arrivalDate; // Update the ending date with the selected flight's arrival date
      
      sessionStorage.setItem('allDetails', JSON.stringify(this.allDetailsObj)); // Store the updated object back in session storage
      
      
      this.route.navigate(['/bookFlight']);
    }
}
