import { BadRequestException, Body, Controller, Get, Post, Render, Req, Res, UploadedFile,  UseFilters,  UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { Express } from 'express';
import { HttpErrorFilter } from "../shared/http-error.filter";
import { YoutubeVideoService } from "../service/youtube-video.service";

const fs = require("fs");

//const OAuth2Data = require("./client_secret_499338069385-e0gv1g2ffq5qk5h3e5uvbrc6e43m3r31.apps.googleusercontent.com.json");
const { google } = require("googleapis");

const OAuth2Data = {
    client_id:"499338069385-e0gv1g2ffq5qk5h3e5uvbrc6e43m3r31.apps.googleusercontent.com",
    project_id:"youtubeapi-305411",
    auth_uri:"https://accounts.google.com/o/oauth2/auth",
    token_uri:"https://oauth2.googleapis.com/token",
    auth_provider_x509_cert_url:"https://www.googleapis.com/oauth2/v1/certs",
    client_secret:"VO7OCqY_ZePDPdXe2jkonVEA",
    redirect_uris:["http://localhost:3000/dashboard"],
    javascript_origins:["http://localhost:3008"]

}
const CLIENT_ID = OAuth2Data.client_id;
const CLIENT_SECRET = OAuth2Data.client_secret;
const REDIRECT_URL = OAuth2Data.redirect_uris[0];

const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URL
);
var authed = false;
const SCOPES =
  "https://www.googleapis.com/auth/youtube.upload https://www.googleapis.com/auth/userinfo.profile";

@Controller('youtube')
@UseFilters(new HttpErrorFilter())
export class YoutubevideoController{

    constructor(public  youtubVideoService:YoutubeVideoService){}

    @Get()
    callAuthorization(@Req() req,@Res() res ){
        try {
            res.send( oAuth2Client.generateAuthUrl({
              access_type: "offline",
              scope: SCOPES,
            }));
          } catch (error) {
            throw new BadRequestException("Somthing went wrong in getAuthorization()",error.message);
          }         
    }
    @Get('/google/callback')    
    async getToken(@Req() req,@Res() res ){
        const code = req.query.code;
        try {
            oAuth2Client.getToken(code, function (err, tokens){
                if (err) {
                  console.log("Error authenticating");
                  console.log(err);
                  new BadRequestException("Error authenticating",err.message);
                } else {
                  console.log("Successfully authenticated");
                  console.log(tokens);
                  oAuth2Client.setCredentials(tokens);
                 res.send(tokens);
                }
            });  
            
          } catch (error) {
            new BadRequestException("Somthing went wrong getToken()",error.message);
          }
    }
    @Post('/saveToken')
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
            throw new BadRequestException("Somthing went wrong in getAuthorization()",error.message);
        }
    }
    @UseInterceptors(FileInterceptor('file'))
    @Post('/file')
    uploadFile(
      @Body() req,@Res() res,
      @UploadedFile() file: Express.Multer.File,
    ) {

        console.log(req);
        const youtube = google.youtube({ version: "v3", auth: oAuth2Client });
        console.log("youtube data ",youtube)
        youtube.videos.insert(
          {
            resource: {
              // Video title and description
              snippet: {
                  title:req.title,
                  description:req.description,
                  tags:req.tags
              },
              // I don't want to spam my subscribers
              status: {
                privacyStatus: "private",
              },
            },
            // This is for the callback function
            part: "snippet,status",  
            // Create the readable stream to upload the video
            media: {
              body: fs.createReadStream(file.path)
            },
          },
          (err, data) => {
            if(err) {
                var responseData = {
                    statusCode:201,
                    message:"Failed",
                    error:err.message,
                    data:""
                }
                res.send(responseData);
            }else{
                console.log("Done.",data);
                fs.unlinkSync(file.path);
                if(data.data.status.uploadStatus == 'uploaded'){
                    var response = {
                        tatusCode:201,
                        message:"Successfully uploaded video",
                        data:data.data.status
                    }
                    res.send(response);
                }
            }
          }
        );
    }

    @Post('/uploadFileOnYoutube')
    upoladVideo(@Req() req,@Res()res){
      (async () => {
        const data = await this.youtubVideoService.download('https://cdn.filestackcontent.com/myVtNURhQlGdijjRkroI', './video/20201001_Cazoo.Mega.Fundraising_jfiebx.mp4');
        console.log(data); // The file is finished downloading.
        console.log(req);
        //alert("downloading file............")
        const youtube = google.youtube({ version: "v3", auth: oAuth2Client });
        console.log("youtube data ",youtube)
        youtube.videos.insert(
          {
            resource: {
              // Video title and description
              snippet: {
                  title:"sofadogpramod",
                  description:"upload video by pramod",
                  tags:"news"
              },
              // I don't want to spam my subscribers
              status: {
                privacyStatus: "private",
              },
            },
            // This is for the callback function
            part: "snippet,status",  
            // Create the readable stream to upload the video
            
          //static path //  '/video demo upload/20201001_Cazoo.Mega.Fundraising_jfiebx.mp4'
            media: {
              body: fs.createReadStream('./video/20201001_Cazoo.Mega.Fundraising_jfiebx.mp4')
            },
          },
          (err, data) => {
            if(err) {
                var responseData = {
                    statusCode:201,
                    message:"Failed",
                    error:err.message,
                    data:""
                }
                res.send(responseData);
            }else{
                console.log("Done.",data);
               
                if(data.data.status.uploadStatus == 'uploaded'){
                    var response = {
                        statusCode:201,
                        message:"Successfully uploaded video",
                        data:data.data.status
                    }
                   // fs.unlinkSync("./video/xyz.mp4");
                    res.send(response);
                }
            }
          }
        );
    })();
    
    


    }
}