import { InjectRepository, Repository } from "@iaminfinity/express-cassandra";
import { Injectable } from "@nestjs/common";
import { Observable } from "rxjs";
import { YoutubeCredentialsInterface } from "src/dto/youtube-credentials.interface";
import { YoutubeCredentialsEntity } from "../entity/youtube-credentials.entity";

@Injectable()
export class YoutubeCredentialsService{

  constructor(
    @InjectRepository(YoutubeCredentialsEntity)
    private readonly youtubeCredentialsRepository:Repository<YoutubeCredentialsEntity>,
  ){}

  saveYoutubeCredentials(youtubeCredentialsInterface:YoutubeCredentialsInterface):Observable<YoutubeCredentialsEntity>{   
      return  this.youtubeCredentialsRepository.save(youtubeCredentialsInterface);
  }

  getYoutubeCredentials(userId):Observable<YoutubeCredentialsEntity>{
      return  this.youtubeCredentialsRepository.findOne({user_id:userId});
  }
}