import { IBookingHistory } from "./IBookingHistory"

export interface IShowUser {
    iD: number,
    userName: string,
    email: string,
    phoneNumber: number,
    numOfBookingsMade: number
    bookingHistory: IBookingHistory[]
}