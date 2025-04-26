import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-commonbar',
  imports: [RouterLink],
  templateUrl: './commonbar.component.html',
  styleUrl: './commonbar.component.css'
})
export class CommonbarComponent {
  title = 'Demo Travel App';

  constructor(){}

}
