import { Controller, Get } from '@nestjs/common';
import { LocatorService } from './locator.service';

@Controller()
export class LocatorController {
  constructor(private readonly locatorService: LocatorService) {}

  @Get()
  getHello(): string {
    return this.locatorService.getHello();
  }
}
