import { ExpressCassandraModule } from '@iaminfinity/express-cassandra';
import { Global, Module } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { MulterModule } from '@nestjs/platform-express';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from './config/config.module';
import { ConfigService } from './config/config.service';
import { UsersController } from './Controller/UsersController';
import { videoInfoController } from './Controller/video-info.controller';
import { YoutubeCredentialsontroller } from './Controller/youtube-credntials.cotroller';
import { YoutubevideoController } from './Controller/YoutubeVideoController';

import { UserTokenEntity } from './entity/user-token.entity';
import { UsersEntity } from './entity/users.entity';
import { VideoInfoEntity } from './entity/video-info.entity';
import { YoutubeCredentialsEntity } from './entity/youtube-credentials.entity';
import { YoutubeTokenEntity } from './entity/youtube-token.entity';
import { TokenRepository } from './service/token-repository';
import { UserTokenService } from './service/user-token.service';
import { UsersService } from './service/users.service';
import { VideoInfoService } from './service/video-info.service';
import { YoutubeCredentialsService } from './service/youtube-credntials.service';
import { YoutubeVideoService } from './service/youtube-video.service';
import { HttpErrorFilter } from './shared/http-error.filter';
import { LoggingInterceptor } from './shared/logging.interceptor';

@Global()
@Module({
  imports: [
    
    ExpressCassandraModule.forRootAsync({
      name: 'uploader',
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => config.getDbConfig1(),
      inject: [ConfigService],
      useClass: ConfigService,
    }),
    ExpressCassandraModule.forFeature([YoutubeTokenEntity,
      YoutubeCredentialsEntity,UsersEntity,UserTokenEntity,
      TokenRepository,VideoInfoEntity], 'uploader'),
    MulterModule.register({dest:'./video'})
  ],
  controllers: [
    AppController,YoutubevideoController,
    YoutubeCredentialsontroller,UsersController,
    videoInfoController
  ],
  providers: [
    AppService,YoutubeVideoService,
    YoutubeCredentialsService,UsersService,
    VideoInfoService,
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
