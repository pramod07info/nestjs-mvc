import { Controller, Get, Render, UseFilters } from '@nestjs/common';
import { AppService } from './app.service';
import { HttpErrorFilter } from './shared/http-error.filter';

@Controller()
@UseFilters(new HttpErrorFilter())
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/index')
  @Render('login/index')
  root() {
    return { title: 'Home Page' };
  }

  @Get('/uploadvideo')
  @Render('uploadvideo')
  about() {
    return { title: 'Video Upload Page' };
  }

  @Get('/')
  @Render('videolist')
  login() {
    return { title: 'Video List' };
  }
}
