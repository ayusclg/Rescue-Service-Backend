import { NestFactory } from '@nestjs/core';
import { LocatorModule } from './locator.module';
import { Transport } from '@nestjs/microservices';
async function bootstrap() {
  const app = await NestFactory.createMicroservice(LocatorModule, {
    transport: Transport.TCP,
    option: {
      host: 'localhost',
      port: 3002
    }
  });
  await app.listen();
}

bootstrap()
  .then((res) => {
    console.log('locator service is running', res);
  })
  .catch((err) => {
    console.log('Error In Locator service', err);
  });
