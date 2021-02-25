import { InjectRepository, Repository } from "@iaminfinity/express-cassandra";
import { Injectable } from "@nestjs/common";
import { Observable } from "rxjs";
import { YoutubeTokenEntity } from "../entity/youtube-token.entity";
const fs = require("fs");
const express = require("express");
const multer = require("multer");

//const OAuth2Data = require("./client_secret_499338069385-e0gv1g2ffq5qk5h3e5uvbrc6e43m3r31.apps.googleusercontent.com.json");
const { google } = require("googleapis");
var title, description;
var tags = [];
const OAuth2Data = {
    client_id:"499338069385-e0gv1g2ffq5qk5h3e5uvbrc6e43m3r31.apps.googleusercontent.com",
    project_id:"youtubeapi-305411",
    auth_uri:"https://accounts.google.com/o/oauth2/auth",
    token_uri:"https://oauth2.googleapis.com/token",
    auth_provider_x509_cert_url:"https://www.googleapis.com/oauth2/v1/certs",
    client_secret:"VO7OCqY_ZePDPdXe2jkonVEA",
    redirect_uris:["http://localhost:3008/youtube/google/callback"],
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

  var Storage = multer.diskStorage({
    destination: function (req, file, callback) {
      callback(null, "./videos");
    },
    filename: function (req, file, callback) {
      callback(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
    },
  });
  
var upload = multer({
    storage: Storage,
  }).single("file"); //Field name and max count

@Injectable()
export class YoutubeVideoService{

  constructor(
    @InjectRepository(YoutubeTokenEntity)
    private readonly youtubeTokenRepository:Repository<YoutubeTokenEntity>,
  ){}

 
  getById(id: any):Observable<YoutubeTokenEntity>{
    return this.youtubeTokenRepository.findOne(id);
  }
  getAuthorization():string{
    var url = oAuth2Client.generateAuthUrl({
        access_type: "offline",
        scope: SCOPES,
      });
      console.log(url);
    return url;
  }
  saveYoutubeToken(data:any):Observable<YoutubeTokenEntity>{
    var returnData = this.youtubeTokenRepository.save(data);
    returnData.toPromise();
    console.log(returnData);
    return returnData;
  }
  
  async getToken(code):Promise<any>{

    await  oAuth2Client.getToken(code, function (err, tokens):Promise<any> {
      if (err) {
      console.log("Error authenticating");
      console.log(err);
      } else {
      console.log("Successfully authenticated");
      console.log(tokens);
      oAuth2Client.setCredentials(tokens);
     
      return tokens;
      }
  });
  }

  uploadFile(req,file){

        console.log(file.path);
        title = req.title;
        description = req.description;
        tags = req.tags;
        console.log(title);
        console.log(description);
        console.log(tags);
        const youtube = google.youtube({ version: "v3", auth: oAuth2Client });
        console.log(youtube)
        youtube.videos.insert(
          {
            resource: {
              // Video title and description
              snippet: {
                  title:title,
                  description:description,
                  tags:tags
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
            if(err) throw err
            console.log(data)
            console.log("Done.");
            fs.unlinkSync(file.path);
            return "success";
          }
        );
  }
 
}