import { Module } from '@nestjs/common';
import { DoorsService } from './doors.service';
import { DoorsController } from './doors.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Door, DoorSchema } from './schema/door.schema';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Door.name, schema: DoorSchema }]),
    UsersModule,
  ],
  providers: [DoorsService],
  controllers: [DoorsController],
})
export class DoorsModule {}
