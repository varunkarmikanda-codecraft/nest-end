import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { DbModule } from './modules/db/db.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LoggerModule } from 'nestjs-pino';
import { randomUUID } from 'crypto';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    LoggerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => {
        return {
          pinoHttp: {
            level: config.getOrThrow('LOG_LEVEL'),
            redact: {
              paths: [
                'req.headers.authorization',
                'req.headers.cookie',
                'req.headers["x-api-key"]',
                'req.headers["x-auth-token"]',
                'req.body.password',
                'req.body.currentPassword',
                'req.body.newPassword',
                'req.body.confirmPassword',
                'req.body.token',
                'req.body.accessToken',
                'req.body.refreshToken',
                'req.body.secret',
                'req.body.apiKey',
                '*.password',
                '*.pin',
                '*.secret',
                '*.token',
                '*.ssn',
                '*.creditCard',
                '*.cardNumber',
                '*.cvv',
                '*.accountNumber',
                '*.routingNumber',
                '*.iban',
                '*.dateOfBirth',
                '*.dob',
              ],
              censor: '[REDACTED]',
            },
            genReqId: (req: {
              headers: Record<string, string | string[] | undefined>;
            }) => {
              const header = req.headers['x-request-id'];
              return typeof header === 'string' ? header : randomUUID();
            },
            customLogLevel: (
              _req: unknown,
              res: { statusCode: number },
              err?: Error,
            ): 'error' | 'warn' | 'info' => {
              if (err || res.statusCode >= 500) {
                return 'error';
              }
              if (res.statusCode >= 400) {
                return 'warn';
              }
              return 'info';
            },
            transport: {
              target: 'pino-pretty',
              options: { colorize: true },
            },
          },
        };
      },
      inject: [ConfigService],
    }),
    UsersModule,
    DbModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
