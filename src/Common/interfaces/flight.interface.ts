import { IPassenger } from "./passenger.interface";

export interface IFlight extends Document{
    
    pilot:String;
    airplane:String;
    destinationCity: String;
    flightDate: Date;
    passengers: IPassenger[];
}