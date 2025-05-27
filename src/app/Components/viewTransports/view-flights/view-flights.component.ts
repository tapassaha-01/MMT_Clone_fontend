import { Component, inject, OnInit } from '@angular/core';
import { IFlightDetails } from '../../../Interface/IFlightDetails';
import { CommonModule, NgFor } from '@angular/common';
import { Router } from '@angular/router';
import { CustomerbarComponent } from "../../customerbar/customerbar.component";
import { UserService } from '../../../Services/user.service';

@Component({
  selector: 'app-view-flights',
  imports: [CommonModule, CustomerbarComponent],
  templateUrl: './view-flights.component.html',
  styleUrl: './view-flights.component.css'
})
export class ViewFlightsComponent implements OnInit {

  private route = inject(Router);
  allDetailsObj: any;
  allFlightDetailsArray: IFlightDetails[] = [];
  requiredFlightDetails: IFlightDetails = {
    planeCompanyName: '',
    departureDate: new Date(),
    arrivalDate: new Date(),
    startFrom: '',
    destination: '',
    travelTime: 0,
    flightClass: '',
    fairType: '',
    price: 0
  }

  departure: string = "";
  destination: string = "";
  journeyDate: Date = new Date();
  
  private _service = inject(UserService);
    // have to change this drastically as i need get method for the flight details 
    // have to add sessionstorage.getitem and then parse it to get the object and then use it in the constructor
    constructor(){
      // this.GetFlightDetails();
    }
  
    ngOnInit(): void {

      // this.flightDetailsArray = GetFlightDetails(); // This function will be used to get the flight details from the database
  
      var allDetails = sessionStorage.getItem('allDetails');
      if (allDetails) {
        this.allDetailsObj = JSON.parse(allDetails);
        this.requiredFlightDetails.destination = this.allDetailsObj.endTo; // destination will be fetched from the session storage
        this.requiredFlightDetails.startFrom = this.allDetailsObj.startFrom; // origin will // ending date will be fetched from the session storage   
        this.requiredFlightDetails.fairType = this.allDetailsObj.fairType; // fair type will be fetched from the session storage
        this.requiredFlightDetails.flightClass = this.allDetailsObj.bookingClass; // flight class will be fetched from the session storage
        
        }

    this.departure = this.allDetailsObj.startFrom; // origin and destination both has to be fetched from the database
    this.destination = this.allDetailsObj.endTo; // origin and destination both has to be fetched from the database
    this.journeyDate = this.allDetailsObj.startDate; // start date will depend upon the transport and destination however as of now we are taking it from the session storage
this.GetFlightDetails();
    }
      
    // Fetch all the flight details using the service.ts method
    GetFlightDetails() {
      this._service.GetFlightDetails(this.requiredFlightDetails).subscribe(
        (data: IFlightDetails[]) => {
          this.allFlightDetailsArray = data;
          console.log(data);
        },
        (error) => {
          console.error('Error fetching flight details:', error);
        }
      );
    }

    // these methods are alsoo not complete, as there are no methods in service.ts thus printing it in console
    onBookFlight(flight: IFlightDetails) {
      this.allDetailsObj.startDate=flight.departureDate; // Update the starting date with the selected flight's departure date
      this.allDetailsObj.endingDate=flight.arrivalDate; // Update the ending date with the selected flight's arrival date
      
      sessionStorage.setItem('allDetails', JSON.stringify(this.allDetailsObj)); // Store the updated object back in session storage
      
      
      this.route.navigate(['/bookFlight']);
    }
}
