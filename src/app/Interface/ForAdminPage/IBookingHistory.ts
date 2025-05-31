export interface IBookingHistory {
        bookingID: number,
        bookingDate: Date, // new field added
        numOfPassengers: number, // new field added
        flightID: number,
        flightName: string,
        departureDate: Date,
        arrivalDate: Date,
        startFrom: string,
        destination: string,
        travelTime: number,
        flightClass: string,
        fairType: string,
        price: number
}