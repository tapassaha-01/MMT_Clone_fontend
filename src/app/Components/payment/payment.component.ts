import { Component, OnInit } from '@angular/core';
import { CustomerbarComponent } from "../customerbar/customerbar.component";
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-payment',
  imports: [CustomerbarComponent, FormsModule, ReactiveFormsModule],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css'
})
export class PaymentComponent implements OnInit{

  payerName: string='Debu';
  paymentAmount = 7000;

  paymentForm!: FormGroup;


  constructor(private formBuilder: FormBuilder){}

  ngOnInit(): void {
      this.paymentForm=this.formBuilder.group({
        payerName: [this.payerName],
        paymentMethod: [''],
        paymentAmount: [this.paymentAmount],
        upinumber:['', [Validators.required]],
        expThrough: ['', [Validators.required]],
        cvvNumber: ['', [Validators.required]]
      });
  }

  // Method to confirm payment
  OnPayment(_form: FormGroup){
    
  }

  // to fetch the user name from the DB
  OnGetName(){
    
  }

  // to fetch the amount to be paid by the user
  OnGetPaymentAmount(){

  }
}
