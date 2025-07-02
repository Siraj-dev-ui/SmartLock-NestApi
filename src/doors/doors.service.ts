import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Door, DoorDocument } from './schema/door.schema';
import { Model } from 'mongoose';
import { CreateDoorDto } from './dtos/create-door.dto';
import { UsersService } from 'src/users/users.service';
import { ScheduleDto } from './dtos/dtos';
import { Device } from 'src/utils/enums';

@Injectable()
export class DoorsService {
  constructor(
    @InjectModel(Door.name) private doorModel: Model<DoorDocument>,
    private readonly userService: UsersService,
  ) {}

  async create(createDoorDto: CreateDoorDto): Promise<Door> {
    console.log('inside door service...');
    console.log('create door dto data : ', createDoorDto);

    const createdDoor = new this.doorModel(createDoorDto); // ✅ FIXED
    return await createdDoor.save();
  }

  async GetDoor(id: string) {
    // return await this.doorModel.findOne({ door_lock_Id: id });

    const [door, supervisorCount] = await Promise.all([
      this.doorModel.findOne({ door_lock_Id: id }),
      this.userService.getPresentSupervisorsCount(Device.ID),
    ]);

    return { ...door?.toJSON(), supervisorCount: supervisorCount };
  }

  async updateDoorStatus(updateDoorStatusDto: CreateDoorDto) {
    return await this.doorModel.findOneAndUpdate(
      { door_lock_Id: '234' },
      { $set: { door_status: 'open' } },
      { new: true },
    );
  }

  async UpdateTimings(data: ScheduleDto) {
    const resp = await this.doorModel.findOneAndUpdate(
      { _id: data.id },
      { schedule: data.schedule },
      { new: true },
    );

    return resp;
  }

  async UpdateDoorStatus(status) {
    const result = await this.doorModel.findOneAndUpdate(
      { door_lock_Id: Device.ID },
      { door_status: status },
      { new: true },
    );

    return result ? status : false;
  }
  async UpdateRoomStatus(status) {
    const result = await this.doorModel.findOneAndUpdate(
      { door_lock_Id: Device.ID },
      { door_room_status: status },
      { new: true },
    );

    if (status === false) {
      this.userService.CheckOutAll();
    }

    return result ? status : false;
  }
  async UpdateLockStatus(status) {
    const result = await this.doorModel.findOneAndUpdate(
      { door_lock_Id: Device.ID },
      { door_lock_status: status },
      { new: true },
    );

    return result ? status : false;
  }
}
