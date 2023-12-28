import { Module } from '@nestjs/common';
import { FlightController } from './flight.controller';
import { FlightService } from './flight.service';
import { MongooseModule } from '@nestjs/mongoose';
import { FLIGHT } from 'src/Common/Models/Models';
import { Flight } from './Schema/flight.Schema';
import { PassengerService } from 'src/passenger/passenger.service';
import { PassengerModule } from 'src/passenger/passenger.module';


@Module({
  imports:[MongooseModule.forFeatureAsync([{
    name:FLIGHT.name,
    useFactory: ()=>Flight.plugin(require('mongoose-autopopulate'))


  }]),PassengerModule],
  controllers: [FlightController],
  providers: [FlightService]
})
export class FlightModule {}
