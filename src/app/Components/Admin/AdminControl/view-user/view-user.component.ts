import { Component } from '@angular/core';
import { IShowUser } from '../../../../Interface/ForAdminPage/IShowUser';

@Component({
  selector: 'app-view-user',
  imports: [],
  templateUrl: './view-user.component.html',
  styleUrl: './view-user.component.css'
})
export class ViewUserComponent {
  userDetails: IShowUser = {
    id: 74,
    userName: 'vstshr',
    email: 'rtbrvth',
    phoneNo: 1424275275,
    numOfBookingsMade: 0,
    bookingHistory: []
  }


  

}
