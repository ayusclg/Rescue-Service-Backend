import { Controller, Get } from '@nestjs/common';

@Controller('user')
export class UserController {
  @Get('/')
  random(): string {
    return `this is user controller in api-gateway`;
  }
}
