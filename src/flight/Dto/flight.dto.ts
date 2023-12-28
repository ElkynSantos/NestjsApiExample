import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsNotEmpty, IsString } from "class-validator";


export class FlightDTO{

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    readonly pilot:String;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    readonly airplane:String;
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    readonly destinationCity: String;
    @ApiProperty()
    @IsNotEmpty()
    @IsDate()
    readonly flightDate: Date;
}