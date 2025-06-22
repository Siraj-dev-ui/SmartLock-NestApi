import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Actions, ActionStatus } from 'src/utils/enums';

export type ActionDocument = HydratedDocument<Action>;

@Schema()
export class Action {
  @Prop()
  action_id: number;

  @Prop({ default: ActionStatus.PENDING })
  action_status: string;

  @Prop({ default: true })
  action_active: boolean;

  @Prop()
  action_message: string;
}

export const ActionSchema = SchemaFactory.createForClass(Action);
ActionSchema.set('timestamps', true);
