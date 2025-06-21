import { Body, Controller, Get, Patch, Post, Put, Query } from '@nestjs/common';
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

  @Get('get-door')
  async GetDoor(@Query('id') id: string) {
    return await this.doorsService.GetDoor(id);
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

  @Patch('update-door-lock-status')
  UpdateDoorLock(@Body() data) {
    return 'updated door room status api.';
  }

  @Put('update-timings')
  UpdateTimings(@Body() data) {
    return 'Update LAB timings..';
  }

  @Get('get-door')
  GetDoorData(@Body() data) {
    return 'Getting Door Data';
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
