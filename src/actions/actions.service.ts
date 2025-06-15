import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Action, ActionDocument } from './schema/action.schema';
import { AddActionDto } from './dtos/add-action.dto';

@Injectable()
export class ActionsService {
  constructor(
    @InjectModel(Action.name) private actionModel: Model<ActionDocument>,
  ) {}

  async getActiveAction() {
    const data = await this.actionModel.find().sort({ createdAt: -1 }).limit(1);
    console.log('Get Active Action : ', data);
    return data;
  }

  async addNewAction(addActionDto: AddActionDto) {
    const addAction = new this.actionModel(addActionDto); // ✅ FIXED
    return addAction.save();
  }
}
