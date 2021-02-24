import { ExpressCassandraModule } from '@iaminfinity/express-cassandra';
import { Global, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from './config/config.module';
import { ConfigService } from './config/config.service';
import { YoutubevideoController } from './Controller/YoutubeVideoController';
import { YoutubeTokenEntity } from './entity/youtube-token.entity';
import { YoutubeVideoService } from './service/youtube-video.service';

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
    ExpressCassandraModule.forFeature([YoutubeTokenEntity], 'uploader'),
  ],
  controllers: [AppController,YoutubevideoController],
  providers: [AppService,YoutubeVideoService],
})
export class AppModule {}
