import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { AbstractControl, AbstractControlOptions, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ITravelDetails } from '../../../Interface/ITravelDetails';
import { UserService } from '../../../Services/user.service';
import { ElementRef, ViewChild, HostListener, AfterViewInit } from '@angular/core';
import { debounceTime } from 'rxjs';
import { ICities } from '../../../Interface/ICities';


@Component({
  selector: 'app-flight',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './flight.component.html',
  styleUrl: './flight.component.css'
})
export class FlightComponent implements OnInit {

  //#region => Dependency Injection
    private _service = inject(UserService);
    private formBuilder = inject(FormBuilder);
    private route = inject(Router);

    //#endregion

  //#region -> Variables and Form Controls
    listOfCities: ICities = {
      destination: [],
      startFrom: []
    };
    suggestedDepartures: string[] = [];
    suggestedDestinations: string[] = [];

    dept = new FormControl('', Validators.required);
    dest = new FormControl('', Validators.required);

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
  //#endregion

  //#region -> Constructor and ngOnInit
    constructor(){

        this.searchFlightForm = this.formBuilder.group({
          departure: this.dept,
          destination: this.dest,
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
    setTimeout(() => {
      this.FetchAllCities();
      }, 2000);

    this.dept.valueChanges
      .pipe(debounceTime(200))
      .subscribe(value => this.filterDepartureCities(value ?? ''));

    this.dest.valueChanges
      .pipe(debounceTime(200))
      .subscribe(value => this.filterDestinationCities(value ?? ''));

  }

  //#endregion

  //#region -> OUTSIDE CLICK HANDLER
  // This method is used to close the dropdown when clicking outside of it

    @ViewChild('dropdownWrapper') dropdownWrapper!: ElementRef;

    @HostListener('document:click', ['$event.target'])
    onClickOutside(targetElement: HTMLElement) {
      if (this.dropdownWrapper && !this.dropdownWrapper.nativeElement.contains(targetElement)) {
        this.suggestedDepartures = [];
        this.suggestedDestinations = [];
      }
    }

  //#endregion

  //#region => METHODS

  // these methods are also not complete, as there are no methods in service.ts thus printing it in console
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

  // METHOD FOR city filtering in the dropdown
  filterDepartureCities(query: string) {
    if (!query) {
      this.suggestedDepartures = this.listOfCities.startFrom; // Show first 5 cities if query is empty
      return;
    }
    this.suggestedDepartures = this.listOfCities.startFrom
      .filter(city => city.toLowerCase().includes(query.toLowerCase()));
  }

  filterDestinationCities(query: string) {
    if (!query) {
      this.suggestedDestinations = this.listOfCities.destination; // Show first 5 cities if query is empty
      return;
    }
    this.suggestedDestinations = this.listOfCities.destination
    .filter(city => city.toLowerCase().includes(query.toLowerCase()));
  }


  // Method for fetching all the cities from the service
  FetchAllCities(): void {
    this._service.FetchAllCities().subscribe(
      success=>{
        this.listOfCities = success;
      },
      error=>{
        console.error("Error fetching cities: ", error);
      }
    )
  }

  // METHOD FOR SELECTING SUGGESTION FROM AUTOCOMPLETE and cleaening the dropdown
  selectDeparture(city: string) {
    this.dept.setValue(city, { emitEvent: false });
    this.suggestedDepartures = [];
  }

  selectDestination(city: string) {
    this.dest.setValue(city, { emitEvent: false });
    this.suggestedDestinations = [];
  }


//#endregion

}


//#region  -> CUSTOM VALIDATIONS = CHECK FUNCTIONS

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

//#endregion