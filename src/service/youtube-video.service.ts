import { InjectRepository, Repository } from "@iaminfinity/express-cassandra";
import { BadRequestException, Injectable } from "@nestjs/common";
import { promises } from "fs";
import { from, Observable } from "rxjs";
import { YoutubeTokenInterface } from "src/dto/youtube-token-interface";
import { YoutubbeTokenDto,  } from "src/dto/youtube-token.dto";
import { HttpErrorFilter } from "src/shared/http-error.filter";
import { YoutubeTokenEntity } from "../entity/youtube-token.entity";

@Injectable()
export class YoutubeVideoService{

  constructor(
    @InjectRepository(YoutubeTokenEntity)
    private readonly youtubeTokenRepository:Repository<YoutubeTokenEntity>,
  ){}


  async saveYoutubeToken(youTubeToken:YoutubeTokenInterface){
    try {
      return await this.youtubeTokenRepository.save(youTubeToken)
    } catch (error) {
      throw new BadRequestException("Somthing went wrong",error.message);
    }
  }
 
 
}