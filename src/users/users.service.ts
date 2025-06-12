import { Injectable } from '@nestjs/common';
import { RegisterUserDto } from './dto/register-user.dto';

@Injectable()
export class UsersService {
  create(createUserDto: RegisterUserDto) {
    return 'This action adds a new user';
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
