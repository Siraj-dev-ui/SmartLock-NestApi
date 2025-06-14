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

  @Prop({
    type: Map,
    of: {
      opening_time: { type: String }, // e.g., "10:00"
      closing_time: { type: String }, // e.g., "14:00"
    },
    default: {},
  })
  schedule: Map<string, { opening_time: string; closing_time: string }>;
}

export const DoorSchema = SchemaFactory.createForClass(Door);
DoorSchema.set('timestamps', true);
