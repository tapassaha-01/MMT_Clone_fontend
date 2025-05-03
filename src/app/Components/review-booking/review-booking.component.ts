import { CommonModule, NgFor } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CustomerbarComponent } from "../customerbar/customerbar.component"; 

@Component({
  selector: 'app-review-booking',
  imports: [CommonModule, NgFor, CustomerbarComponent, RouterLink],
  templateUrl: './review-booking.component.html',
  styleUrl: './review-booking.component.css'
})
export class ReviewBookingComponent implements OnInit {

  private router = inject(Router);
  allDetails: any;

  constructor(){
    var allDetailsObj = sessionStorage.getItem('allDetails');
    if (allDetailsObj) {
      this.allDetails = JSON.parse(allDetailsObj);
    }  
  }
  ngOnInit(): void {
      
  }
}
