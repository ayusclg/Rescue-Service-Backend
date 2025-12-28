import { Controller, Get } from '@nestjs/common';
import { DispatchService } from './dispatch.service';

@Controller()
export class DispatchController {
  constructor(private readonly dispatchService: DispatchService) {}

  @Get()
  getHello(): string {
    return this.dispatchService.getHello();
  }
}
