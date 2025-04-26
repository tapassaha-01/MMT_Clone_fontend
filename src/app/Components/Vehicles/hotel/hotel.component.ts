import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, AbstractControlOptions, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';

@Component({
  selector: 'app-hotel',
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './hotel.component.html',
  styleUrl: './hotel.component.css'
})
export class HotelComponent implements OnInit {
  
  searchHotelForm!: FormGroup;
  
  constructor(private builder: FormBuilder){}

  ngOnInit(): void {
      this.searchHotelForm=this.builder.group({
        city: ['', [Validators.required]],
        checkin: ['', [Validators.required, CheckInDateVerification]],
        checkout: ['', [Validators.required]],
        rooms: [1, [Validators.required]],
        guests: [1, [Validators.required]]
      },
    {
      validators: CheckOutDateVerification
    } as AbstractControlOptions);
  }

  OnSearchHotel(_form: FormGroup){
    
  }
}

// CHECK FUNCTIONS

export function CheckInDateVerification(control: FormControl): ValidationErrors | null {
  var today = new Date();
  var dDay = new Date(control.value);

  if(dDay<today){
    return {dateError:{
      message: "Chech-in must be greater or equal to today"
    }}
  }

  return null;
}

export function CheckOutDateVerification(control: AbstractControl): ValidationErrors | null {
  const checkin = new Date(control.get('checkin')?.value);
  const checkout = new Date(control.get('checkout')?.value);

  if(checkout<checkin){
    return{
      returnDateError:{
        message: "Check-out date must be greater or equal to check-in date"
      }
    };
  }
  return null;
}