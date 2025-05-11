import { IPassengerDetails } from './IPassengerDetails';

export interface ITravelDetails{
    startFrom: string,
    endTo: string,
    startDate: Date,
    endingDate: Date,
    passengerNo: number,
    bookingClass: string,
    emailId: string,
    passengers: IPassengerDetails[],
    bookingDate: Date
}