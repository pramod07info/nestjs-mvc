import { Inject, Injectable } from '@nestjs/common';
import {
  BaseModel,
  InjectModel,
  uuid,
  InjectConnection,
  errors,
  Repository,
  InjectRepository,
} from '@iaminfinity/express-cassandra';
import { Observable } from 'rxjs';
import { VideoInfoEntity } from 'src/entity/video-info.entity';
import { VideoInfoDto } from 'src/dto/video-info.dto';
import { videoInfoController } from 'src/Controller/video-info.controller';
@Injectable()
export class VideoInfoService {
  constructor(
    @InjectRepository(VideoInfoEntity)
    private readonly videoInfoRepository: Repository<VideoInfoEntity>,
    
  ) { }

  async create(videoInfoDto: VideoInfoDto){   
      let videInfo= {
          user_id:uuid(videoInfoDto.user_id),
          url:videoInfoDto.url,
          status:videoInfoDto.status,
          dailymotion_status:videoInfoDto.dailymotion_status,
          youtube_status:videoInfoDto.youtube_status
      } 
   return await this.videoInfoRepository.save(videInfo,{if_not_exist:false});
  }

  findAll(): Observable<VideoInfoEntity[]> {
    return  this.videoInfoRepository.find({}, { raw: true });
  }

  

}