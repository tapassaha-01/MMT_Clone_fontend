import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, AbstractControlOptions, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IFlightDetails } from '../../../Interface/IFlightDetails';


@Component({
  selector: 'app-flight',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './flight.component.html',
  styleUrl: './flight.component.css'
})
export class FlightComponent implements OnInit {

  searchFlightForm!: FormGroup;
  travelClass: string[] = ['Business', 'First Class', 'Economy', 'Premium Economy'];

  constructor(private formBuilder: FormBuilder, private route: Router){}

  // The abstractControlOptions was used due to .group being deprecated for the custom validaations being defined in a new array. Thus they are passed as AbstractControlOptions

  ngOnInit(): void {
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



  OnSearchTransport(_form: FormGroup){
    console.log(_form.value.departure, _form.value.destination, _form.value.journeyDate, _form.value.returnDate, _form.value.numOfPassenger, _form.value.fare, _form.value.travelClass);
    
    this.route.navigate(['/viewFlight', _form.value.departure, _form.value.destination, _form.value.journeyDate]);
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