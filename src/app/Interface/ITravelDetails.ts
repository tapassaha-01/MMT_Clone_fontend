import { IPassengerDetails } from './IPassengerDetails';

export interface ITravelDetails{
    startFrom: string,
    endTo: string,
    startingDate: Date,
    endingDate: Date,
    passengerNum: number,
    bookingClass: string,
    passengers: IPassengerDetails[]
}