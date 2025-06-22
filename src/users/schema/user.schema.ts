import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { RequestStatus } from 'src/utils/enums';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop()
  name: string;

  @Prop()
  email: string;

  @Prop()
  password: string;

  @Prop({ default: RequestStatus.PENDING })
  request_status: string;

  @Prop()
  requested_role: string;

  @Prop()
  mobile_id: string;

  @Prop({ default: false })
  current_presence: boolean;

  @Prop({ default: false })
  auto_unlock: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
UserSchema.set('timestamps', true);
