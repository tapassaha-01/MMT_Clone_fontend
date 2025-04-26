import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomerbarComponent } from "../customerbar/customerbar.component";

@Component({
  selector: 'app-passenger-booking',
  imports: [ReactiveFormsModule, CommonModule, CustomerbarComponent],
  templateUrl: './passenger-booking.component.html',
  styleUrl: './passenger-booking.component.css'
})
export class PassengerBookingComponent implements OnInit {

  bookingForm!: FormGroup;
  passengerEmail: string=''; // fetch this from session storage
  vehicleInfo: string=''; // also fetch this from session storage 
  // [while choosing the vehicle from the show vehicle info page, store the vehicle info there]

  constructor(private formBuilder: FormBuilder, private router: Router){}

  ngOnInit(): void {
      this.bookingForm= this.formBuilder.group({
        startfrom: ['',[Validators.required]], // origin and destination both has to be fetched from the database
        destination: ['',[Validators.required]],
        startdate: ['',[Validators.required]], // check_contraint => greater or equall to current date + transport has to be available
        enddate: [''], // Journey end date will depend upon destination and transport
        numofpassengers: ['',[Validators.required]], // depend upon how many seats left,
        passengerEmail: [''],
        vehicleInfo: ['']
      });
      
  }

  OnBooking(_form: FormGroup){

  }

}
