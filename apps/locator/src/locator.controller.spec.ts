import { Test, TestingModule } from '@nestjs/testing';
import { LocatorController } from './locator.controller';
import { LocatorService } from './locator.service';

describe('LocatorController', () => {
  let locatorController: LocatorController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [LocatorController],
      providers: [LocatorService],
    }).compile();

    locatorController = app.get<LocatorController>(LocatorController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(locatorController.getHello()).toBe('Hello World!');
    });
  });
});
