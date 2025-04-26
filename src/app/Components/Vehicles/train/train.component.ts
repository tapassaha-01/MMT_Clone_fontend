import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, AbstractControlOptions, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';

@Component({
  selector: 'app-train',
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './train.component.html',
  styleUrl: './train.component.css'
})
export class TrainComponent implements OnInit {

  bookingClass: string[] = ["Sleeper", "Third AC", "Second AC", "First AC", "Second Seating", "AC Chair Car", "First Class", "Third AC Economy"];
  searchTrainForm!: FormGroup;

  constructor(private builder: FormBuilder){}

  ngOnInit(): void {
    this.searchTrainForm= this.builder.group({
      departure: ['', [Validators.required]],
      destination: ['', [Validators.required]],
      journeyDate: ['', [Validators.required, CheckJourneyDate]],
      numOfPassenger: [1, [Validators.required]],
      travelClass: ['', [Validators.required]]
    },
    {
      validators: CheckDestination
    } 
  );
  }

  OnSearchTransport(_form: FormGroup){
    console.log(_form.value.departure, _form.value.destination, _form.value.journeyDate, _form.value.numOfPassenger, _form.value.travelClass)
  }
}


// Check Functions
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

export function CheckDestination(control: AbstractControl): ValidationErrors | null {
  const destination = control.get('destination')?.value;
  const departure = control.get('departure')?.value;

  if(destination.toLowerCase()===departure.toLowerCase()){
    return{
      depurtureError:{
        message: "Departure and destination can't be same"
      }
    };
  }

  return null;
}