import { Controller, Get, Render, Req, Res } from "@nestjs/common";
import { YoutubbeTokenDto } from "../dto/youtube-token.dto";
import { YoutubeVideoService } from "../service/youtube-video.service";

@Controller('youtube')
export class YoutubevideoController{

    constructor(private readonly youtubVideoService:YoutubeVideoService){}

    @Get()    
    callAuthorization(@Req() req,@Res() res ){
        try{
            var data = this.youtubVideoService.getAuthorization();
            res.send(data);
        }catch(error){
            console.log(error.message);
        }
    }
    @Get('/google/callback')    
    async getToken(@Req() req,@Res() res ){
        try{
            const code = req.query.code;
            var data = this.youtubVideoService.getToken(code).then((value) => console.log(value,"hhhh"));

           

            console.log("data token ",Promise.resolve(data));
            // data.then(function(result){
                
            //     var youtubeToken = new YoutubbeTokenDto();
            //  //   youtubeToken.setAccessToken();
            //     this.youtubVideoService.saveYoutubeToken(data);
            // })
           
            return res.redirect("/uploadvideo");
        }catch(error){
            console.log(error.message);
        }
    }


}