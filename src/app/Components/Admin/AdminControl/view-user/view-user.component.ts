import { Component } from '@angular/core';
import { IShowUser } from '../../../../Interface/ForAdminPage/IShowUser';
import { CommonModule } from '@angular/common';
import { IBookingHistory } from '../../../../Interface/ForAdminPage/IBookingHistory';

@Component({
  selector: 'app-view-user',
  imports: [CommonModule],
  templateUrl: './view-user.component.html',
  styleUrl: './view-user.component.css'
})
export class ViewUserComponent {

  bookingHistory: IBookingHistory = {
        bookingID: 45,
        bookingDate: new Date, // new field added
        numOfPassengers: 1, // new field added
        flightID: 123456,
        flightName: "Boing",
        departureDate: new Date,
        arrivalDate: new Date,
        startFrom: "Sydney",
        destination: "Dubai",
        travelTime: 456.23,
        flightClass: "Economy",
        fairType: "One Way",
        price: 8888
  }

  userDetails: IShowUser = {
    id: 74,
    userName: 'vstshr',
    email: 'rtbrvth',
    phoneNo: 1424275275,
    numOfBookingsMade: 0,
    bookingHistory: [this.bookingHistory]
  }

    userDetails1: IShowUser = {
    id: 74,
    userName: 'ertewr',
    email: 'rtbrertewrtvth',
    phoneNo: 1424275275,
    numOfBookingsMade: 0,
    bookingHistory: [this.bookingHistory, this.bookingHistory]
  }


    usersList: IShowUser[] = [this.userDetails, this.userDetails1];


  expandedRowIndex: number | null = null;

  toggleDetails(index: number): void {
    if (this.expandedRowIndex === index) {
      this.expandedRowIndex = null;
    } else {
      this.expandedRowIndex = index;
    }
  }


}
