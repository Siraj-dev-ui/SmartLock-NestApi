import { Module } from '@nestjs/common';
import { ActionsService } from './actions.service';
import { ActionsController } from './actions.controller';
import { Action, ActionSchema } from './schema/action.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Action.name, schema: ActionSchema }]),
  ],
  providers: [ActionsService],
  controllers: [ActionsController],
})
export class ActionsModule {}
