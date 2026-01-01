/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { jwtVerify } from '@app/common/Guard/verify';
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException
} from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class riderVerifyAuth implements CanActivate {
  constructor(private readonly jwtVerify: jwtVerify) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context
      .switchToHttp()
      .getRequest<
        Request & {
          cookies?: Record<string, string>;
          user?: Record<string, any>;
        }
      >();

    let token: string | undefined;

    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      token = authHeader.split(' ')[1];
    }

    if (!token && req.cookies?.accessToken) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      token = req.cookies.accessToken;
    }

    if (!token) {
      throw new UnauthorizedException('Token missing');
    }

    // Verify token
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const riderPayload = await this.jwtVerify.verify(token);

    req.user = riderPayload;

    return true;
  }
}
