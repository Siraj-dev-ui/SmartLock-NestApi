import { Injectable } from '@nestjs/common';
import { RegisterUserDto } from './dto/register-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { User, UserDocument } from './schema/user.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Device, RequestStatus, Roles } from 'src/utils/enums';
import { AutoUnlockDto } from './dto/dtos';
import { AppGateway } from 'src/app.gateway';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private readonly appGateway: AppGateway,
  ) {}

  async RegisterRequest(createUserDto: RegisterUserDto) {
    const user = await this.userModel.findOne(
      {
        email: createUserDto.email,
        request_status: { $ne: 'Rejected' },
      },
      {
        email: 1,
        request_status: 1,
      },
    );

    if (user) {
      return { userFound: true, requestStatus: user.request_status };
    }

    const registerRequest = new this.userModel(createUserDto);

    await registerRequest.save();

    return {
      userFound: false,
      message: 'Your Request has been sended Wait for the approval.',
    };
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
    const user = await this.userModel.findOne(
      {
        // email: loginUserDto.email,
        email: { $regex: new RegExp(`^${loginUserDto.email}$`, 'i') },
        password: loginUserDto.password,
        request_status: { $ne: RequestStatus.REJECT },
      },
      { password: 0 },
    );

    return user ? user : [];
  }

  async getPresentSupervisorsCount(deviceId: string) {
    return await this.userModel.countDocuments({
      current_presence: true,
      requested_role: Roles.SUPERVISOR,
    });
  }

  async UpdateAutoUnlock(autoUnlockDto: AutoUnlockDto) {
    const resp = await this.userModel.findOneAndUpdate(
      { _id: autoUnlockDto.id },
      { auto_unlock: autoUnlockDto.autoUnlock },
      { new: true },
    );
    return resp;
  }

  async GetPendingRequests() {
    return await this.userModel.find({ request_status: RequestStatus.PENDING });
  }
  async CheckedIn(id: string) {
    await this.userModel.findByIdAndUpdate(
      { _id: id },
      { current_presence: true },
      { new: true },
    );
    const supervisorCount = await this.getPresentSupervisorsCount(Device.ID);

    if (supervisorCount > 0) {
      this.appGateway.updateSupervisorCount({ count: supervisorCount });
    }

    return true;
  }
  async CheckOutAll() {
    //  const usersWithPresence = await this.userModel.find({ current_presence: true });

    await this.userModel.updateMany(
      { current_presence: true },
      { $set: { current_presence: false } },
    );
    this.appGateway.updateSupervisorCount({ count: 0 });

    // await this.userModel.find(
    //   { _id: id },
    //   { current_presence: true },
    //   { new: true },
    // );
    // const supervisorCount = await this.getPresentSupervisorsCount(Device.ID);

    // if (supervisorCount > 0) {
    //   this.appGateway.updateSupervisorCount({ count: supervisorCount });
    // }

    return true;
  }
}
