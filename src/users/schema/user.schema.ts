import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop()
  name: string;

  @Prop()
  email: string;

  @Prop()
  password: string;

  @Prop()
  register_request_status: string;

  @Prop()
  requested_role: string;

  @Prop()
  mobile_id: string;

  @Prop()
  current_presence: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
UserSchema.set('timestamps', true);
