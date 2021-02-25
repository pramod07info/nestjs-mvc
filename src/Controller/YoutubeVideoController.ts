import { Body, Controller, Get, Post, Render, Req, Res, UploadedFile,  UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { Express } from 'express';
import { fileURLToPath } from "url";
import { YoutubbeTokenDto } from "../dto/youtube-token.dto";
import { YoutubeVideoService } from "../service/youtube-video.service";
const multer = require("multer");

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

    @UseInterceptors(FileInterceptor('file'))
    @Post('/file')
    @Render('uploadvideo')
    uploadFile1(
      @Body() req,
      @UploadedFile() file: Express.Multer.File,
    ) {
        console.log("dkaslidsa ",file)        
       //var data = this.youtubVideoService.uploadFile(req,file);
      // console.log("data ",data);
      return { success: 'successfully Upload video'};
    }
}