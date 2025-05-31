import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { CommonbarComponent } from "../commonbar/commonbar.component";
import { FlightComponent } from "../Vehicles/flight/flight.component";
import { CustomerbarComponent } from "../customerbar/customerbar.component";
import { TrainComponent } from "../Vehicles/train/train.component";
import { BusComponent } from "../Vehicles/bus/bus.component";
import { HotelComponent } from "../Vehicles/hotel/hotel.component";
import { CabComponent } from "../Vehicles/cab/cab.component";

@Component({
  selector: 'app-home',
  imports: [CommonModule, CommonbarComponent, FlightComponent, CustomerbarComponent, TrainComponent, BusComponent, HotelComponent, CabComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  title = 'Demo Travel';
  selectedTransport: string = 'flight';
  loginStatus: boolean = false;
  isAdmin: boolean = false;
  user: any;


  loremArray: string[][] = [
  ["Lorem ipsum dolor sit amet, consectetur adipiscing elit.", "assets/blog_pics/beach.jpg"],
  ["Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.","assets/blog_pics/beach1.jpeg"],
  ["Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.","assets/blog_pics/dubai.jpeg"],
  ["Duis aute irure dolor in reprehenderit in voluptate velit esse cillum.","assets/blog_pics/beach.jpg"],
  ["Excepteur sint occaecat cupidatat non proident, sunt in culpa.","assets/blog_pics/dubai.jpeg"],
  ["Curabitur pretium tincidunt lacus. Nulla gravida orci a odio.","assets/blog_pics/beach1.jpeg"],
  ["Nullam varius, turpis et commodo pharetra, est eros bibendum elit.","assets/blog_pics/dubai.jpeg"],
  ["Phasellus fermentum in, dolor. Pellentesque facilisis.","assets/blog_pics/beach.jpg"],
  ["Suspendisse potenti. Sed egestas, ante et vulputate volutpat.","assets/blog_pics/beach1.jpeg"],
  ["Maecenas malesuada elit lectus felis, malesuada ultricies.","assets/blog_pics/dubai.jpeg"]
];


  constructor(@Inject(PLATFORM_ID) private platformId: any) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {

      var temp = localStorage.getItem('user');
      if(temp != null){
        this.user = JSON.parse(temp);
        this.loginStatus = true;
        this.isAdmin = this.user.isAdmin === 'true';
      }
    }
  }

  OnTransportSelection(name: string) {
    this.selectedTransport = name;
  }
}