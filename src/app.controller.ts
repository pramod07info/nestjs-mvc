import { Controller, Get, Render } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/')
  @Render('index')
  root() {
    return { title: 'Home Page' };
  }

  @Get('/uploadvideo')
  @Render('uploadvideo')
  about() {
    return { title: 'Video Upload Page' };
  }

  @Get('/dashbord')
  @Render('videolist')
  login() {
    return { title: 'Dashbord Page' };
  }
}
