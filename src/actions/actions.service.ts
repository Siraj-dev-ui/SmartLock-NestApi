import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Action, ActionDocument } from './schema/action.schema';
import { AddActionDto } from './dtos/add-action.dto';
import { Actions, ActionStatus } from 'src/utils/enums';
// import { UsersService } from 'src/users/users.service';
import { DoorsService } from 'src/doors/doors.service';
import { AppGateway } from 'src/app.gateway';

@Injectable()
export class ActionsService {
  constructor(
    @InjectModel(Action.name) private actionModel: Model<ActionDocument>,
    private readonly doorService: DoorsService,
    private readonly appGateWay: AppGateway,
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
      // case Actions.COMPLETE_ACTION:
      //   console.log('completing action');
      //   await this.completeAction();
      //   const lockStatus = await this.doorService.UpdateLockStatus(false);
      //   this.appGateWay.updateLockStatus({ status: lockStatus });
      //   break;
      case Actions.LOCK_DOOR:
        console.log('completing action (lock the door)');
        await this.completeAction();
        await this.doorService.UpdateLockStatus(true);
        this.appGateWay.updateLockStatus({ status: true });
        break;

      case Actions.UNLOCK_DOOR:
        console.log('completing action (unlock the door)');
        await this.completeAction();
        await this.doorService.UpdateLockStatus(false);
        this.appGateWay.updateLockStatus({ status: false });
        break;

      case Actions.DOOR_OPENED:
        console.log('door opened');
        await this.doorService.UpdateDoorStatus(true);
        this.appGateWay.updateDoorStatus({ status: true });
        break;

      case Actions.DOOR_CLOSED:
        console.log('door closed');
        await this.doorService.UpdateDoorStatus(false);
        this.appGateWay.updateDoorStatus({ status: false });
        break;

      case Actions.ROOM_OCCUPIED:
        console.log('room occupied');
        await this.doorService.UpdateRoomStatus(true);
        this.appGateWay.updateRoomStatus({ status: true });
        break;

      case Actions.ROOM_VACANT:
        console.log('room vacant');
        await this.doorService.UpdateRoomStatus(false);
        this.appGateWay.updateRoomStatus({ status: false });
    }
    return true;
  }

  GetActiveClients() {
    // return {
    //   count: this.appGateWay.get,
    // };

    return true;
  }
}
