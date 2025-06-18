import { Injectable } from '@nestjs/common';
import { RegisterUserDto } from './dto/register-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { User, UserDocument } from './schema/user.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { RequestStatus } from 'src/utils/enums';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async RegisterRequest(createUserDto: RegisterUserDto) {
    const registerRequest = new this.userModel(createUserDto);

    return await registerRequest.save();
  }

  async ApproveRequest(id: string) {
    return await this.userModel.findByIdAndUpdate(
      id,
      {
        request_status: RequestStatus.APPROVE,
      },
      { new: true },
    );
  }
  async RejectRequest(id: string) {
    return await this.userModel.findByIdAndUpdate(
      id,
      {
        request_status: RequestStatus.REJECT,
      },
      { new: true },
    );
  }

  async Login(loginUserDto: LoginUserDto) {
    const user = await this.userModel.findOne({
      email: loginUserDto.email,
      password: loginUserDto.password,
    });

    return user ? { request_status: user.request_status } : [];
  }
}
