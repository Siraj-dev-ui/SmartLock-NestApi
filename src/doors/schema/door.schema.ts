import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type DoorDocument = HydratedDocument<Door>;

@Schema()
export class Door {
  @Prop()
  door_name: string;

  @Prop()
  door_status: string;

  @Prop()
  door_lock_Id: string;

  @Prop()
  door_lock_status: string;

  @Prop()
  door_room_status: string;
}

export const DoorSchema = SchemaFactory.createForClass(Door);
