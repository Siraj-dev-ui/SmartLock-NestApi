import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './users/users.module';
import { DoorsModule } from './doors/doors.module';

@Module({
  // imports: [DatabaseModule, UsersModule, DoorsModule],
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://smartlock:smartlock@cluster0.ngqnqr3.mongodb.net/Smartlock?retryWrites=true&w=majority&appName=Cluster0',
    ),
    UsersModule,
    DoorsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
