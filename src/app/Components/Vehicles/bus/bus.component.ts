import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';


@Component({
  selector: 'app-bus',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './bus.component.html',
  styleUrl: './bus.component.css'
})
export class BusComponent implements OnInit{

  searchBusForm!: FormGroup;

  constructor(private formBuilder: FormBuilder){}

  ngOnInit(): void {
      this.searchBusForm = this.formBuilder.group({
        destination: ['', [Validators.required]],
        origin: ['', [Validators.required]],
        departureDate: ['', [Validators.required, CheckJourneyDate]]
      })
  }


  OnSearchBus(_form: FormGroup){

  }
}


export function CheckDestination(control: AbstractControl): ValidationErrors | null {
  const destination = control.get('destination')?.value;
  const departure = control.get('origin')?.value;

  if(destination.toLowerCase()===departure.toLowerCase()){
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
