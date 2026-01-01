import { NestFactory } from '@nestjs/core';

import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { connectRedis } from '@app/common';

async function bootstrap() {
  await connectRedis();
  const appContext = await NestFactory.createApplicationContext(AppModule);
  const config = appContext.get(ConfigService);
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.TCP,
      options: {
        host: config.get<string>('HOST'),
        port: config.get<number>('PORT')
      }
    }
  );

  await app.listen();
}
bootstrap()
  .then((res) => {
    console.log('Rider service is running', res);
  })
  .catch((err) => {
    console.log('Error In Rider service', err);
  });
