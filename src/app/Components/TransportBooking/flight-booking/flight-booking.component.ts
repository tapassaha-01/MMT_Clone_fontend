import { CommonModule, DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule, Validators, FormBuilder, FormArray, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomerbarComponent } from "../../customerbar/customerbar.component";
import { UserService } from '../../../Services/user.service';
import { ITravelDetails } from '../../../Interface/ITravelDetails';

@Component({
  selector: 'app-flight-booking',
  imports: [CustomerbarComponent, ReactiveFormsModule, CommonModule],
  templateUrl: './flight-booking.component.html',
  styleUrl: './flight-booking.component.css'
})
export class FlightBookingComponent implements OnInit {

  bookingForm!: FormGroup;
  allDetailsObj!: ITravelDetails;
  
  constructor(private formBuilder: FormBuilder, private router: Router,private _service: UserService ) {
    this.bookingForm = this.formBuilder.group({
      startFrom: ['', Validators.required],
      endTo: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      passengerNum: ['', Validators.required],
      emailId: ['', Validators.required],
      passengers: this.formBuilder.array([this.createPassengerGroup()])
    });    
  }

  ngOnInit(): void {
    var allDetails = sessionStorage.getItem('allDetails');
    if (allDetails) {
      this.allDetailsObj = JSON.parse(allDetails);

      this.bookingForm= this.formBuilder.group({
        startFrom: [this.allDetailsObj.startFrom], // origin and destination both has to be fetched from the database
        endTo: [this.allDetailsObj.endTo],
        startDate: [this.allDetailsObj.startDate], // start date will depend upon the transport and destination however as of now we are taking it from the session storage
        endDate: [this.allDetailsObj.endingDate], // Journey end date will depend upon destination and transport
        passengerNum: [this.allDetailsObj.passengerNo], 
        emailId:[this.allDetailsObj.emailId],// depend upon how many seats left,
        passengers: this.formBuilder.array([this.createPassengerGroup()])
      });
    }
  }

  createPassengerGroup(): FormGroup {
    return this.formBuilder.group({
      name: ['', Validators.required],
      phoneNo: ['', [Validators.required]],
      addharNo: ['', [Validators.required]],
      age: ['', [Validators.required]],
      birthdate: ['', [Validators.required]],
      gender: ['', Validators.required],
      nationality: ['', [Validators.required]],
    });
  }

  // Get passengers as FormArray
  get passengers(): FormArray {
    return this.bookingForm.get('passengers') as FormArray;
  }

  // Update passenger list when number changes
  onNumberOfPassengersChange(count: number) { 
    const passengerArray = this.passengers;
    const currentCount = passengerArray.length;

    if (count > currentCount) {
      for (let i = currentCount; i < count; i++) {
        passengerArray.push(this.createPassengerGroup());
      }
    } else if (count < currentCount) {
      for (let i = currentCount - 1; i >= count; i--) {
        passengerArray.removeAt(i);
      }
    }
  }

  // these methods are alsoo not complete, as there are no methods in service.ts thus printing it in console
  OnBooking(_form: FormGroup){
    // Here we will send the data to the backend and then redirect to the payment page
    
    this.allDetailsObj.passengers = _form.value.passengers;
    this.allDetailsObj.passengerNo = _form.value.passengerNum;
    this.allDetailsObj.emailId = _form.value.emailId;
    this.allDetailsObj.bookingDate = new Date(); // Set the booking date to the current date

    sessionStorage.setItem('allDetails', JSON.stringify(this.allDetailsObj));

    //calling to the service to book the flight ticket
    this._service.bookFlight(this.allDetailsObj).subscribe((res) => {
      console.log(res);
    }, 
    
    (error) => {
      console.error(error);
      this.bookingForm.reset(); // Reset the form on error
      alert("An error occurred. Please try again.");
    });

  }
}
