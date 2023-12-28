import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards} from '@nestjs/common';
import { UserDTO } from './dto/user.dto';
import { UserService } from './user.service';
import { zip } from 'rxjs/operators';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt.auth.guard';

@ApiTags('user')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('api/v1/user')
export class UserController {

    constructor (private readonly userService:UserService) {

    }

    @Post('')
    create(@Body() UserDTO:UserDTO){
        return this.userService.create(UserDTO)
    }
    
    @Get('')
    getUser(){
        return this.userService.findAll();
    }

    @Get(':id')
    getUserbyId(@Param('id') id:String){
        return this.userService.findOne(id);
    }

    @Put(':id')
    update(@Param('id') id: String, @Body() UserDTO:UserDTO){
        return this.userService.update(id,UserDTO)
    }
    
    @Delete(':id')
    DeleteUser(@Param('id') id:String){

        return this.userService.Delete(id);
    }




    
}
