import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();

  await app.listen(process.env.PORT ?? 3000);

  // const configService = app.get(ConfigService);
  // const port = configService.get<number>('PORT') || 3000;

  // // ✅ Explicitly bind to 0.0.0.0
  // await app.listen(port, '0.0.0.0');
}
bootstrap();
