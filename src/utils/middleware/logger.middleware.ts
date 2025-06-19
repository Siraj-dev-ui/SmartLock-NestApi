// logger.middleware.ts
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const { method, originalUrl, body } = req;

    console.log(`\n➡️  [${method}] ${originalUrl}`);
    console.log('Request body:', body);

    // Capture the response
    const originalSend = res.send;
    res.send = function (data) {
      console.log(`⬅️  Response for ${originalUrl}:`, data);
      return originalSend.call(this, data);
    };

    next();
  }
}
