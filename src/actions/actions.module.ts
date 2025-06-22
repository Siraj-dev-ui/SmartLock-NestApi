import { Module } from '@nestjs/common';
import { ActionsService } from './actions.service';
import { ActionsController } from './actions.controller';
import { Action, ActionSchema } from './schema/action.schema';
import { MongooseModule } from '@nestjs/mongoose';
// import { UsersService } from 'src/users/users.service';
// import { UsersModule } from 'src/users/users.module';
import { DoorsModule } from 'src/doors/doors.module';
import { AppGateway } from 'src/app.gateway';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Action.name, schema: ActionSchema }]),
    DoorsModule,
  ],
  providers: [ActionsService, AppGateway],
  controllers: [ActionsController],
})
export class ActionsModule {}
