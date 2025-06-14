import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ActionDocument = HydratedDocument<Action>;

@Schema()
export class Action {
  @Prop()
  action_id: number;

  @Prop()
  action_status: string;

  @Prop()
  action_active: boolean;

  @Prop()
  action_message: string;
}

export const ActionSchema = SchemaFactory.createForClass(Action);
ActionSchema.set('timestamps', true);
