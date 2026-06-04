import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import util from 'node:util';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // console.log(util.inspect(app, { depth: null, colors: true }));
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
