import { ExpressCassandraModule } from '@iaminfinity/express-cassandra';
import { Global, Module } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { MulterModule } from '@nestjs/platform-express';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from './config/config.module';
import { ConfigService } from './config/config.service';
import { YoutubevideoController } from './Controller/YoutubeVideoController';
import { YoutubeTokenEntity } from './entity/youtube-token.entity';
import { YoutubeVideoService } from './service/youtube-video.service';
import { HttpErrorFilter } from './shared/http-error.filter';
import { LoggingInterceptor } from './shared/logging.interceptor';

@Global()
@Module({
  imports: [
    ExpressCassandraModule.forRootAsync({
      useClass: ConfigService,
    }),
    ExpressCassandraModule.forRootAsync({
      name: 'uploader',
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => config.getDbConfig1(),
      inject: [ConfigService],
    }),
    ExpressCassandraModule.forFeature([YoutubeTokenEntity], 'uploader'),MulterModule.register({dest:'./video'})
  ],
  controllers: [AppController,YoutubevideoController],
  providers: [AppService,YoutubeVideoService,
    {
      provide:APP_FILTER,
      useClass:HttpErrorFilter
    },
    {
      provide:APP_INTERCEPTOR,
      useClass:LoggingInterceptor
    }
  ],
})
export class AppModule {}