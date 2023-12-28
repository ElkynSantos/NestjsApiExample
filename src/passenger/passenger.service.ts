import { HttpStatus,Injectable } from '@nestjs/common';
import { PassengerDTO } from './dto/passenger.dto';
import { IPassenger } from 'src/Common/interfaces/passenger.interface';
import { InjectModel } from '@nestjs/mongoose';
import { PASSENGER } from 'src/Common/Models/Models';
import {Model} from 'mongoose'

@Injectable()
export class PassengerService {


    constructor(@InjectModel(PASSENGER.name) private readonly model:Model<IPassenger>){

    }
    async create(PassengerDTO:PassengerDTO) : Promise<IPassenger>{

        const NewPassenger = new this.model(PassengerDTO);

        return await NewPassenger.save();
    }

    async findall () :Promise<IPassenger[]>{

        return await this.model.find();
    }

    async findbyid(id:String) :Promise<IPassenger>{

        return await this.model.findById(id)
    }

    async update(id:String, passengerDTO:PassengerDTO) : Promise<IPassenger>{

        const passenger ={...passengerDTO};



        return await this.model.findByIdAndUpdate(id,passenger,{new:true});

    }

    async delete (id:String){
        await this.model.findByIdAndDelete(id)

        return {status:HttpStatus.OK, msg:"Usuario Borrado con Exito"}
    }
}
