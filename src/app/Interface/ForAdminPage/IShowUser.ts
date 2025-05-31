import { IBookingHistory } from "./IBookingHistory"

export interface IShowUser {
    id: number,
    userName: string,
    email: string,
    phoneNo: number,
    numOfBookingsMade: number
    bookingHistory: IBookingHistory[]
}