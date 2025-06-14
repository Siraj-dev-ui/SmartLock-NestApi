import { Body, Controller, Get, Patch, Post } from '@nestjs/common';
import { DoorsService } from './doors.service';
import { Door } from './schema/door.schema';
import { CreateDoorDto } from './dtos/create-door.dto';

@Controller('doors')
export class DoorsController {
  constructor(private readonly doorsService: DoorsService) {}
  @Get('test')
  test() {
    return { id: 2, name: 'siraj' };
  }

  @Post('add-door')
  CreateDoor(@Body() data: CreateDoorDto) {
    return this.doorsService.create(data);
  }

  @Post('testpost')
  TestPost(@Body() data) {
    console.log(data);
    return 'success';
  }

  @Patch('update-door-status')
  UpdateDoorStatus(@Body() data) {
    return 'updated door status api.';
  }

  @Patch('update-door-room-status')
  UpdateDoorRoomStatus(@Body() data) {
    return 'updated door room status api.';
  }

  @Get('check-door-status')
  CheckDoorStatus(@Body() data) {
    return 'Check door status api.';
  }

  @Get('check-door-room-status')
  CheckDoorRoomStatus(@Body() data) {
    return 'Check door room status api.';
  }
}
