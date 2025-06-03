import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AdsComponent } from "../ads/ads.component";

@Component({
  selector: 'app-commonbar',
  imports: [RouterLink, AdsComponent],
  templateUrl: './commonbar.component.html',
  styleUrl: './commonbar.component.css'
})
export class CommonbarComponent {
  title = 'Demo Travel App';

  constructor(){}

}
