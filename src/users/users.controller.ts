import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { RegisterUserDto } from './dto/register-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('registration-request')
  RegistrationRequest(@Body() data: RegisterUserDto) {
    return this.usersService.create(data);
  }

  @Post('approve-user')
  Approve(@Body() data) {
    return 'Approve Registration Request';
  }

  @Post('reject-user')
  RejectUser(@Body() data) {
    return 'Reject Registration Request';
  }

  @Post('login')
  Login(@Body() data: RegisterUserDto) {
    return 'login in user api';
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }
}
