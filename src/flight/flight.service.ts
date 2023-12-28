import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FLIGHT } from 'src/Common/Models/Models';
import {Model} from 'mongoose'
import { IFlight } from 'src/Common/interfaces/flight.interface';
import { FlightDTO } from './Dto/flight.dto';
import { retry } from 'rxjs';
@Injectable()
export class FlightService {


    constructor(@InjectModel(FLIGHT.name) private readonly model: Model<IFlight>){

    }
 
    async create(FlightDTO: FlightDTO) : Promise<IFlight>{

        const newFlight = new this.model(FlightDTO);

        return await newFlight.save();
    }

    async findall(): Promise<IFlight[]>{
        return await this.model.find();
    }

    async findById(id:String): Promise<IFlight[]>{
        return await this.model.find(id);
    }

    async update(id:String, FlightDTO:FlightDTO): Promise<IFlight>{
        return await this.model.findByIdAndUpdate(id,FlightDTO);
    }

    async delete(id:String){
         await this.model.findByIdAndDelete(id);

         return {status:HttpStatus.OK, msg:"Vuelo Borrado con Exito"}
    }

    async addPassenger(flightId:String, passengerId:String):Promise<IFlight>{

        return (await this.model.findByIdAndUpdate(flightId,{$addToSet:passengerId},{new:true})).populated('passengers')
    }


    


    
}
