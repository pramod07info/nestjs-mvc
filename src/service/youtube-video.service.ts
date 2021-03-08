import { InjectRepository, Repository } from "@iaminfinity/express-cassandra";
import { BadRequestException, Injectable } from "@nestjs/common";
import { promises } from "fs";
import { from, Observable } from "rxjs";
import { YoutubeTokenInterface } from "src/dto/youtube-token-interface";
import { YoutubbeTokenDto,  } from "src/dto/youtube-token.dto";
import { HttpErrorFilter } from "src/shared/http-error.filter";
import { YoutubeTokenEntity } from "../entity/youtube-token.entity";
const request = require('request');
const fs = require('fs');


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
  async  download(url, dest) {

    /* Create an empty file where we can save data */
    const file = fs.createWriteStream(dest);

    /* Using Promises so that we can use the ASYNC AWAIT syntax */
    await new Promise<void>((resolve, reject) => {
      request({
        /* Here you should specify the exact link to the file you are trying to download */
        uri: url,
        gzip: true,
      })
          .pipe(file)
          .on('finish', async () => {
            console.log(`The file is finished downloading.`);
            resolve();
          })
          .on('error', (error) => {
            reject(error);
          });
    })
        .catch((error) => {
          console.log(`Something happened: ${error}`);
        });
}
 
}