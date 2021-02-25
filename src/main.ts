import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import hbs = require('hbs');
import { HttpErrorFilter } from './shared/http-error.filter';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule,{ cors: true });
  app.useGlobalFilters(new HttpErrorFilter());
  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('hbs');

  hbs.registerPartials(join(__dirname, '..', 'views', 'partials'));

  app.enableCors();
  await app.listen(3008);
}

bootstrap();
