import { Module } from '@nestjs/common';
import { ActionsService } from './actions.service';
import { ActionsController } from './actions.controller';
import { Action, ActionSchema } from './schema/action.schema';
import { MongooseModule } from '@nestjs/mongoose';
// import { UsersService } from 'src/users/users.service';
// import { UsersModule } from 'src/users/users.module';
import { DoorsModule } from 'src/doors/doors.module';
import { AppGateway } from 'src/app.gateway';
import { WebsocketModule } from 'src/websocket/websocket.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Action.name, schema: ActionSchema }]),
    DoorsModule,
    WebsocketModule,
  ],
  providers: [ActionsService],
  controllers: [ActionsController],
})
export class ActionsModule {}
