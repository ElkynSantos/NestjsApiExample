import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";

import {Strategy} from 'passport-local'
import { AuthService } from "../auth.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy){

    constructor(private readonly authService: AuthService){

        super();
    }

    async validate(username:String,password:String):Promise<any>{
        const user = await this.authService.validatorUser(username,password)

        if(!user){
            throw new UnauthorizedException();
        }

        return user;
    }
}