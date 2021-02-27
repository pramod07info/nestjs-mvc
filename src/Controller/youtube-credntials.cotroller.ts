import { BadRequestException, Body, Controller, Get, Post, Render, Req, Res, UploadedFile,  UseFilters,  UseInterceptors } from "@nestjs/common";

import { HttpErrorFilter } from "../shared/http-error.filter";
import { YoutubeVideoService } from "../service/youtube-video.service";


@Controller('credentilas')
@UseFilters(new HttpErrorFilter())
export class YoutubeCredentialsontroller{

    constructor(public  youtubVideoService:YoutubeVideoService){}

    @Post('/saveYoutube')
    saveYoutubeTokens(@Req() req,@Res() res ){
        try {
            const data = this.youtubVideoService.saveYoutubeToken(req.body);
            data.then(function(reslover){
                reslover.subscribe((result) => {
                    if(result != null){
                        var responseData = {
                            statusCode:201,
                            message:"successfully save data",
                            data:result
                        }
                        return res.send(responseData);
                    }
                });                
            })
           
          } catch (error) {
            var responseData = {
                statusCode:201,
                message:"successfully save data",
                data:error.message
            }
            return responseData;
            
        }
    }
    
}