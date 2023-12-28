import { Body, Controller,Post,Get, Param, Put, Delete, HttpException, HttpStatus, UseGuards} from '@nestjs/common';
import { FlightService } from './flight.service';
import { FlightDTO } from './Dto/flight.dto';
import { PassengerService } from 'src/passenger/passenger.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt.auth.guard';

@ApiTags('Flights')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('api/v1/flights')
export class FlightController {

    constructor(private readonly flightservice:FlightService, private readonly passangerService:PassengerService){

    }

    @Post('')
    create(@Body() FlightDTO:FlightDTO){
        return this.flightservice.create(FlightDTO);
    }
    
    @Get('')
    getFlights(){
        return this.flightservice.findall();
    }

    @Get(':id')
    getFlightsbyId(@Param('id') id:String){
        return this.flightservice.findById(id);
    }
    
    @Put(':id')
    update(@Param('id') id:String, @Body() FlightDTO:FlightDTO){
        return this.flightservice.update(id,FlightDTO);
    }

    @Delete(':id')
    delete(@Param('id') id:String){

        return this.flightservice.delete(id);
    }

    @Post(':flightId/passenger/:passengerId')
    async  addPassanger(@Param('flightId') flightId:String,
    @Param('passengerId') passangerId:String){

        const passanger= await this.passangerService.findbyid(passangerId)

        if(!passanger){
            throw new HttpException('Passanger Not found', HttpStatus.NOT_FOUND)
        }
        return this.flightservice.addPassenger(flightId,passangerId);
    }



}
