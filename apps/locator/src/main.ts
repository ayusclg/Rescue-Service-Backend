import { NestFactory } from '@nestjs/core';
import { LocatorModule } from './locator.module';

async function bootstrap() {
  const app = await NestFactory.create(LocatorModule);
  await app.listen(process.env.port ?? 3000);
}
bootstrap();
