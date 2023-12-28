import { HttpStatus, Injectable } from '@nestjs/common';
import { UserDTO } from './dto/user.dto';
import { promises } from 'dns';
import { Iuser } from 'src/Common/interfaces/user.interfaces';
import * as bcrypt from 'bcrypt'
import { InjectModel } from '@nestjs/mongoose';
import { USER } from 'src/Common/Models/Models';
import {Model} from 'mongoose'


@Injectable()
export class UserService {

    constructor (@InjectModel(USER.name) private readonly model: Model<Iuser>){

    }

    async checkPassword(password:String, passwordDB:String):Promise<Boolean>{
        return await bcrypt.compare(password,passwordDB);
    }

    async findbyUsername(username:String){
        return await this.model.findOne({username})
    }
    async hashPassword(password:string):Promise<string>{
        const salt =  await bcrypt.genSalt(10);
        return await bcrypt.hash(password,salt);
    }
    async create(UserDTO:UserDTO): Promise<Iuser> {
        const hash = await this.hashPassword(UserDTO.password);

        const newUser= new this.model({...UserDTO,password:hash});
        return await newUser.save()
    }

    async findAll(): Promise<Iuser[]>{
        return await this.model.find()
    }

    async findOne(id:String): Promise<Iuser>{

        return await this.model.findById(id);
    }

    async update (id:String, UserDTO:UserDTO): Promise<Iuser>{

       const hash = await this.hashPassword(UserDTO.password);
       const user ={...UserDTO,password:hash};

       return await this.model.findByIdAndUpdate(id,user,{new:true});
    }

    async Delete (id:String){
        await this.model.findByIdAndDelete(id)

        return {status:HttpStatus.OK, msg:"Usuario Borrado con Exito"}
    }
}
