import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { AbstractControl, AbstractControlOptions, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ITravelDetails } from '../../../Interface/ITravelDetails';
import { UserService } from '../../../Services/user.service';


@Component({
  selector: 'app-flight',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './flight.component.html',
  styleUrl: './flight.component.css'
})
export class FlightComponent implements OnInit {

  private _service = inject(UserService);
  

  searchFlightForm!: FormGroup;
  travelClass: string[] = ['Business', 'First Class', 'Economy', 'Premium Economy'];
  allDetails: ITravelDetails={
    startFrom: '',
    endTo: '',
    startDate: new Date(),
    endingDate: new Date(),
    passengerNo: 0,
    bookingClass: '',
    fairType: '',
    emailId: '',
    passengers: [],
    bookingDate: new Date()
  }

  constructor(private formBuilder: FormBuilder, private route: Router){

      this.searchFlightForm = this.formBuilder.group({
        departure: ['', [Validators.required]],
        destination: ['', [Validators.required]],
        journeyDate: ['', [Validators.required, CheckJourneyDate]],
        returnDate: [''],
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
    // chechikng if any fields are empty
    if (this.searchFlightForm.invalid) {
      // Mark all controls as touched to show errors
      this.searchFlightForm.markAllAsTouched();
      return;
    }
    

    // Store the necessary data into the object created above and storing it in session storage
    this.allDetails.startFrom = _form.value.departure;
    this.allDetails.endTo = _form.value.destination;
    this.allDetails.startDate = _form.value.journeyDate;
    this.allDetails.endingDate = _form.value.returnDate;
    this.allDetails.passengerNo = _form.value.numOfPassenger;
    this.allDetails.bookingClass = _form.value.travelClass;
    this.allDetails.fairType = _form.value.fare;
    this.allDetails.passengers = [];
    sessionStorage.setItem('allDetails', JSON.stringify(this.allDetails));

    this.route.navigate(['/viewFlight']);
  }

  // isFieldInvalid(fieldName: string): boolean {
  //   const field = this.searchFlightForm.get(fieldName);
  //   return field?.invalid && field?.touched || false;
  // }

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