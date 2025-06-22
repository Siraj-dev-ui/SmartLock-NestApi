import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Action, ActionDocument } from './schema/action.schema';
import { AddActionDto } from './dtos/add-action.dto';
import { Actions, ActionStatus } from 'src/utils/enums';
// import { UsersService } from 'src/users/users.service';
import { DoorsService } from 'src/doors/doors.service';

@Injectable()
export class ActionsService {
  constructor(
    @InjectModel(Action.name) private actionModel: Model<ActionDocument>,
    private readonly doorService: DoorsService,
  ) {}

  async getActiveAction() {
    const data = await this.actionModel.find().sort({ createdAt: -1 }).limit(1);
    console.log('Get Active Action : ', data);
    return data;
  }
  async completeAction() {
    const updateAction = await this.actionModel.findOneAndUpdate(
      { action_active: true },
      { $set: { action_active: false, action_status: ActionStatus.COMPLETED } },
      { sort: { createdAt: -1 }, new: true },
    );
    return true;
  }

  async addNewAction(addActionDto: AddActionDto) {
    const addAction = new this.actionModel(addActionDto); // ✅ FIXED
    return addAction.save();
  }

  async SmartLockPostman(command) {
    console.log('command from postman ... ', command);
    switch (command) {
      case Actions.COMPLETE_ACTION:
        console.log('completing action');
        await this.completeAction();
        await this.doorService.UpdateLockStatus(false);
        return true;

      case Actions.DOOR_OPENED:
        console.log('door opened');
        return await this.doorService.UpdateDoorStatus(true);

      case Actions.DOOR_CLOSED:
        console.log('door closed');
        return await this.doorService.UpdateDoorStatus(false);

      case Actions.ROOM_OCCUPIED:
        console.log('room occupied');
        return await this.doorService.UpdateRoomStatus(true);

      case Actions.ROOM_VACANT:
        console.log('room vacant');
        return await this.doorService.UpdateRoomStatus(false);
    }
    return false;
  }
}
