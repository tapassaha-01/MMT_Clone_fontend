import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, AbstractControlOptions, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';

@Component({
  selector: 'app-cab',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './cab.component.html',
  styleUrl: './cab.component.css'
})
export class CabComponent implements OnInit {
 
  searchCabForm!: FormGroup;

  constructor(private formBuilder: FormBuilder){}

  ngOnInit(): void {
      this.searchCabForm = this.formBuilder.group({
        destination: ['', [Validators.required]],
        origin: ['', [Validators.required]],
        departureDate: ['', [Validators.required, CheckJourneyDate]],
        pickUpTime: ['', [Validators.required, CheckTime]]
      },
      {
        validators: CheckDestination
      }
    );
  }

  OnSearchTransport(_form: FormGroup){
    console.log(_form.value.pickUpTime)
  }

}

export function CheckDestination(control: AbstractControl): ValidationErrors | null {
  const destination = control.get('destination')?.value;
  const departure = control.get('origin')?.value;

  if(destination && departure && destination.toLowerCase()===departure.toLowerCase()){
    return{
      depurtureError:{
        message: "Departure and destination can't be same"
      }
    };
  }

  return null;
}


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

export function CheckTime(control: FormControl): ValidationErrors | null{
  const inputTime = control.value;  // Expected format: 'HH:mm'
  const [inputHours, inputMinutes] = inputTime.split(':').map(Number);

  const now = new Date();
  const selectedTime = new Date();

  selectedTime.setHours(inputHours, inputMinutes, 0, 0);  // Set input time on today's date

  if (selectedTime < now) {
    return { timeInPast: { message: 'Selected time must be in the future.' } };
  }

  return null;  // Valid
}