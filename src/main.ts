import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}

bootstrap().then((port) => {
  Logger.log(`🌸 | Wanted Pre Onboarding BE at ${port}`);
});
