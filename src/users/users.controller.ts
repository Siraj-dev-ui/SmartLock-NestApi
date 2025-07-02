import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { ObjectId } from 'mongoose';
import { AutoUnlockDto } from './dto/dtos';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('pending-requests')
  async GetPendingRequests() {
    return await this.usersService.GetPendingRequests();
  }
  @Post('register-request')
  async RegisterRequest(@Body() data: RegisterUserDto) {
    return await this.usersService.RegisterRequest(data);
  }

  @Patch('approve-request')
  async ApproveRequest(@Query('id') id: string) {
    return await this.usersService.ApproveRequest(id);
  }

  @Patch('reject-request')
  async RejectRequest(@Query('id') id: string) {
    return await this.usersService.RejectRequest(id);
  }
  @Patch('update-auto-unlock')
  async UpdateAutoUnlock(@Body() data: AutoUnlockDto) {
    return await this.usersService.UpdateAutoUnlock(data);
  }

  @Patch('checked-in')
  async CheckedIn(@Query('id') id: string) {
    return await this.usersService.CheckedIn(id);
  }

  @Post('login')
  async Login(@Body() data: RegisterUserDto) {
    return await this.usersService.Login(data);
  }
}
