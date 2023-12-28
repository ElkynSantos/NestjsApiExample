import { Controller,Req,Post, Body } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { UserDTO } from 'src/user/dto/user.dto';

@ApiTags('Auth')
@Controller('api/v1/auth')
export class AuthController {

    constructor(private readonly authservice:AuthService){

    }

    @Post('signin')
    async signin(@Req() req){
        return await this.authservice.signIn(req.user);
    }

    @Post('signup')
    async signup(@Body() UserDTO:UserDTO){
        return await this.authservice.singUp(UserDTO);
    }
}
