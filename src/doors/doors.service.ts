import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Door, DoorDocument } from './schema/door.schema';
import { Model } from 'mongoose';
import { CreateDoorDto } from './dtos/create-door.dto';

@Injectable()
export class DoorsService {
  constructor(@InjectModel(Door.name) private doorModel: Model<DoorDocument>) {}

  async create(createDoorDto: CreateDoorDto): Promise<Door> {
    console.log('inside door service...');
    console.log('create door dto data : ', createDoorDto);

    const createdDoor = new this.doorModel(createDoorDto); // ✅ FIXED
    return await createdDoor.save();
  }

  async updateDoorStatus(updateDoorStatusDto: CreateDoorDto) {
    return await this.doorModel.findOneAndUpdate(
      { door_lock_Id: '234' },
      { $set: { door_status: 'open' } },
      { new: true },
    );
  }
}
