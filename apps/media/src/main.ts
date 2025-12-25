import { NestFactory } from '@nestjs/core';
import { MediaModule } from './media.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    MediaModule,
    {
      transport: Transport.TCP,
      options: {
        host: 'localhost',
        port: 3003
      }
    }
  );
  await app.listen();
}
bootstrap()
  .then((res) => {
    console.log('media service is running', res);
  })
  .catch((err) => {
    console.log('Error In media service', err);
  });
