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
    switch (command) {
      // case Actions.COMPLETE_ACTION:
      //   await this.completeAction();
      //   const lockStatus = await this.doorService.UpdateLockStatus(false);
      //   this.appGateWay.updateLockStatus({ status: lockStatus });
      //   break;
      case Actions.LOCK_DOOR:
        await this.completeAction();
        await this.doorService.UpdateLockStatus(true);
        this.appGateWay.updateLockStatus({ status: true });
        break;

      case Actions.UNLOCK_DOOR:
        await this.completeAction();
        await this.doorService.UpdateLockStatus(false);
        this.appGateWay.updateLockStatus({ status: false });
        break;

      case Actions.DOOR_OPENED:
        await this.doorService.UpdateDoorStatus(true);
        this.appGateWay.updateDoorStatus({ status: true });
        break;

      case Actions.DOOR_CLOSED:
        await this.doorService.UpdateDoorStatus(false);
        this.appGateWay.updateDoorStatus({ status: false });
        break;

      case Actions.ROOM_OCCUPIED:
        await this.doorService.UpdateRoomStatus(true);
        this.appGateWay.updateRoomStatus({ status: true });
        break;

      case Actions.ROOM_VACANT:
        await this.doorService.UpdateRoomStatus(false);
        this.appGateWay.updateRoomStatus({ status: false });
    }
    return true;
  }

  GetActiveClients() {
    return {
      count: this.appGateWay.getActiveClientCount(),
      Ids: this.appGateWay.getActiveClientIds(),
    };

    // return true;
  }

  async DeleteAllExceptOne() {
    const latestAction = await this.actionModel
      .findOne({})
      .sort({ createdAt: -1 }) // newest by createdAt
      .select('createdAt'); // only get _id (or nothing if not needed)

    // Step 2: Delete all other documents
    if (latestAction) {
      await this.actionModel.deleteMany({
        createdAt: { $lt: latestAction.createdAt },
      });
    }

    return true;
  }
}
