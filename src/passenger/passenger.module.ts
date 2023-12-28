import { Module } from '@nestjs/common';
import { PassengerController } from './passenger.controller';
import { PassengerService } from './passenger.service';
import { MongooseModule } from '@nestjs/mongoose';
import { PASSENGER } from 'src/Common/Models/Models';
import { PassengerSchema } from './Schema/passenger.schema';

@Module({
  imports:[
    MongooseModule.forFeatureAsync([{name:PASSENGER.name, useFactory:()=>PassengerSchema,},])
  ],
  controllers: [PassengerController],
  providers: [PassengerService],
  exports:[PassengerService],
})
export class PassengerModule {}
