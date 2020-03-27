import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class DatingMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    req.body.lastUpdatedAt = new Date();
    next();
  }
}
