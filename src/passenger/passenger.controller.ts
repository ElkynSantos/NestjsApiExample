import { Controller, Post ,Body, Get, Param, Put, Delete, UseGuards} from '@nestjs/common';
import { PassengerDTO } from './dto/passenger.dto';
import { PassengerService } from './passenger.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt.auth.guard';

@ApiTags('Passenger')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('api/v1/passenger')
export class PassengerController {

    constructor(private readonly passangerService: PassengerService){

    }

    @Post('')
    create(@Body() passengerDTO: PassengerDTO) {
     return this.passangerService.create(passengerDTO); 
    }

    @Get('')
    findall(){
        return this.passangerService.findall();
    }

    @Get(':id')
    findbyid(@Param('id') id:String){
        return this.passangerService.findbyid(id)
    }

    @Put(':id')
    update(@Param('id') id:String, @Body() PassengerDTO:PassengerDTO){
        return this.passangerService.update(id,PassengerDTO);
    }

    @Delete(':id')
    delete (@Param('id') id:String){
        return this.passangerService.delete(id)
    }

}
