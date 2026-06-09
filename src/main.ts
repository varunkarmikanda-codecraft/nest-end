import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { Logger } from 'nestjs-pino';
import helmet from 'helmet';
// import util from 'node:util';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // console.log(util.inspect(app, { depth: null, colors: true }));
  app.useLogger(app.get(Logger));

  app.use(helmet());
  app.enableVersioning({ type: VersioningType.URI, prefix: 'v' });
  app.setGlobalPrefix('api');
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: { enableImplicitConversion: true },
      stopAtFirstError: false,
    }),
  );

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
