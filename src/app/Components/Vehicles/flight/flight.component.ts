import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, AbstractControlOptions, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ITravelDetails } from '../../../Interface/ITravelDetails';


@Component({
  selector: 'app-flight',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './flight.component.html',
  styleUrl: './flight.component.css'
})
export class FlightComponent implements OnInit {

  searchFlightForm!: FormGroup;
  travelClass: string[] = ['Business', 'First Class', 'Economy', 'Premium Economy'];
  allDetails: ITravelDetails={
    startFrom: '',
    endTo: '',
    startingDate: new Date(),
    endingDate: new Date(),
    passengerNum: 0,
    bookingClass: '',
    passengers: []
  }

  constructor(private formBuilder: FormBuilder, private route: Router){

      this.searchFlightForm = this.formBuilder.group({
        departure: ['', [Validators.required]],
        destination: ['', [Validators.required]],
        journeyDate: ['', [Validators.required, CheckJourneyDate]],
        returnDate: ['', [Validators.required]],
        numOfPassenger: [1, [Validators.required]],
        travelClass: ['', [Validators.required]],
        fare: ['', [Validators.required]]
      },
      {
        validators: [CheckReturnDate, CheckDestination]
      } as AbstractControlOptions
    );
  } 

  ngOnInit(): void {
  }


// these methods are alsoo not complete, as there are no methods in service.ts thus printing it in console
  OnSearchTransport(_form: FormGroup){
    // Store the necessary data into the object created above and storing it in session storage
    this.allDetails.startFrom = _form.value.departure;
    this.allDetails.endTo = _form.value.destination;
    this.allDetails.startingDate = _form.value.journeyDate;
    this.allDetails.endingDate = _form.value.returnDate;
    this.allDetails.passengerNum = _form.value.numOfPassenger;
    this.allDetails.bookingClass = _form.value.travelClass;
    this.allDetails.passengers = [];
    sessionStorage.setItem('allDetails', JSON.stringify(this.allDetails));

    this.route.navigate(['/viewFlight']);
  }

}


// CHECK FUNCTIONS

export function CheckJourneyDate(control: FormControl): ValidationErrors | null {
  var today = new Date();
  var dDay = new Date(control.value);

  if(dDay<today){
    return {dateError:{
      message: "Journey date must be greater or equal to today"
    }}
  }

  return null;
}

export function CheckReturnDate(control: AbstractControl): ValidationErrors | null {
  const journeyDate = new Date(control.get('journeyDate')?.value);
  const returnDate = new Date(control.get('returnDate')?.value);

  if(returnDate<journeyDate){
    return{
      returnDateError:{
        message: "Return Date must be greater or equal to journey date"
      }
    };
  }
  return null;
}

export function CheckDestination(control: AbstractControl): ValidationErrors | null {
  const destination = control.get('destination')?.value;
  const departure = control.get('departure')?.value;

  if(destination && departure && destination.toLowerCase()===departure.toLowerCase()){
    return{
      depurtureError:{
        message: "Departure and destination can't be same"
      }
    };
  }

  return null;
}