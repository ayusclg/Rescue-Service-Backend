import { Injectable } from '@nestjs/common';

@Injectable()
export class LocatorService {
  getHello(): string {
    return 'Hello World!';
  }
}
