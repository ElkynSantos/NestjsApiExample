import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserDTO } from 'src/user/dto/user.dto';
import { UserService } from 'src/user/user.service';


@Injectable()
export class AuthService {


    constructor(private readonly userService:UserService, private readonly jwtService:JwtService){

    }


   
    async validatorUser(username:String,password:String):Promise<any>{

        const user=await this.userService.findbyUsername(username);
        
        const isvalidPassword = await this.userService.checkPassword(password,user.password)
        
        if(user && isvalidPassword ){
            return user;
        }
        return null
    }

    async signIn(user:any){
        const payload={
            username:user.username,
            sub:user._id,


        }

        return {access_token:this.jwtService.sign(payload)}
    }
    async singUp(UserDTO:UserDTO){
        return this.userService.create(UserDTO);
    }
}
