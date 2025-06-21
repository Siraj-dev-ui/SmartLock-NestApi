import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type DoorDocument = HydratedDocument<Door>;

@Schema()
export class Door {
  @Prop()
  door_name: string;

  @Prop()
  door_status: boolean;

  @Prop({ default: 'Device_E0891425BF58' })
  door_lock_Id: string;

  @Prop()
  door_lock_status: boolean;

  @Prop()
  door_room_status: boolean;

  @Prop({
    type: Map,
    of: {
      opening_time: { type: String }, // e.g., "10:00"
      closing_time: { type: String }, // e.g., "14:00"
      is_open: { type: Boolean },
    },
    default: {},
  })
  schedule: Map<
    string,
    { opening_time: string; closing_time: string; is_open: boolean }
  >;
}

export const DoorSchema = SchemaFactory.createForClass(Door);
DoorSchema.set('timestamps', true);
