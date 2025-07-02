import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './users/users.module';
import { DoorsModule } from './doors/doors.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ActionsModule } from './actions/actions.module';
// import { LoggerMiddleware } from './utils/middleware/logger.middleware';
import { AppGateway } from './app.gateway';
import { WebsocketModule } from './websocket/websocket.module';

@Module({
  // imports: [DatabaseModule, UsersModule, DoorsModule],
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // makes ConfigService available everywhere without importing again
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'),
      }),
      inject: [ConfigService],
    }),
    UsersModule,
    DoorsModule,
    ActionsModule,
    WebsocketModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
