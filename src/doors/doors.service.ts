import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Door, DoorDocument } from './schema/door.schema';
import { Model } from 'mongoose';
import { CreateDoorDto } from './dtos/create-door.dto';
import { UsersService } from 'src/users/users.service';

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
      this.userService.getPresentSupervisorsCount('Device123'),
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
}
