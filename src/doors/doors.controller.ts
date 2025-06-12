import { Body, Controller, Get, Patch, Post } from '@nestjs/common';
import { DoorsService } from './doors.service';
import { Door } from './schema/door.schema';
import { CreateDoorDto } from './dtos/create-door.dto';

@Controller('doors')
export class DoorsController {
  constructor(private readonly doorsService: DoorsService) {}
  @Get('test')
  test() {
    return 'door controller working...';
  }

  @Post('add-door')
  CreateDoor(@Body() data: CreateDoorDto) {
    return this.doorsService.create(data);
  }

  @Patch('update-door-status')
  UpdateDoorStatus(@Body() data) {
    return 'updated door status api.';
  }

  @Get('check-door-status')
  CheckDoorStatus(@Body() data) {
    return 'Check door status api.';
  }
}
