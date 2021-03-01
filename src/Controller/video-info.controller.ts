import { Body, Controller, Get, HttpException, HttpStatus, Param, Post, Req, Res, UseFilters } from '@nestjs/common';

import { ParseUuidPipe } from '../pipes/parse-uuid.pipe'
import { IResponse } from '../response/IResponse';
import { HttpErrorFilter } from '../shared/http-error.filter';
import { uuid } from '@iaminfinity/express-cassandra';
import { VideoInfoService } from '../service/video-info.service';
var axios = require('axios');
var qs = require('qs');
var FormData = require('form-data');
@Controller('video')
@UseFilters(new HttpErrorFilter())
export class videoInfoController {
  constructor(private readonly videoInfoService:VideoInfoService) { }

  @Post()
  async create(@Req() req,@Res() res) {
      var data = this.videoInfoService.create(req.body).catch(err => {
        throw new HttpException({
          message: err.message
        }, HttpStatus.BAD_REQUEST);
      });
    data.then(function(reslove){
      reslove.subscribe(function(result){
        if(result != null){
          const iResponse: IResponse = {
            statusCode: "201",
            message: "Successfully upload video",
            data:result
          }
          res.send(iResponse);
        }else{
          const iResponse: IResponse = {
            statusCode: "404",
            message: "somthing went wrong",
          }
          return res.send(iResponse);
        }
    });
    })
  }

  @Post("/getToken")
  async getDailyMotionToken(@Req() req,@Res() res) {
    
    var data = qs.stringify({
    'Content-Type': 'application/x-www-form-urlencoded',
    'grant_type': 'password',
    'client_id': 'c1832cbdcf7f0f5e77ad',
    'client_secret': '228dd8b98a8f8dfafe50e96f1aa28f34cf13fe2e',
    'username': 'pramod07info@gmail.com',
    'password': 'Sani@341' 
    });
    var config = {
      method: 'post',
      url: 'https://api.dailymotion.com/oauth/token',
      headers: { 
        'Authorization': 'djRWTBoAWBlXG0QYF14eQFkeVkEOTBwOH1UWDAgHUkhK', 
        'Content-Type': 'application/x-www-form-urlencoded', 
        'Cookie': 'ts=216950; v1st=47258D7780AC95553BB31C2658863EED'
      },
      data : data
    };

    axios(config)
    .then(function (response) {
      console.log("token data ",JSON.stringify(response.data));
      return res.send(response.data);
    })
    .catch(function (error) {
      console.log(error);
      return res.send(error.message);
    });
  }
  @Post('/getVideoId')
  async getVideoid(@Req() req,@Res() res){
      console.log("req",req.body);
      var data = new FormData();
      var config = {
        method: 'post',
        url: 'https://api.dailymotion.com/me/videos',
        headers: { 
          'Authorization': 'Bearer '+req.body.access_token, 
          'Cookie': 'ts=216950; v1st=47258D7780AC95553BB31C2658863EED', 
          ...data.getHeaders()
        },
        data : data
      };
      console.log()
      axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        return res.send(response.data);
      })
      .catch(function (error) {
        console.log(error);
        return res.send(error.message);
      });

  }

  @Post('/uploadOnDailyMotion')
  uploadVideoOnDailyMotion(@Req() req,@Res() res){
   console.log("request Upload Video data",req.body);
 
var data = qs.stringify({
 'channel': 'music',
  'title': 'sofadog',
  'url': req.body.url, 
  'published': 'true' 
});
var config = {
  method: 'post',
  url: 'https://api.dailymotion.com/video/'+req.body.videoId,
  headers: { 
    'Authorization': 'Bearer '+req.body.access_token, 
    'Content-Type': 'application/x-www-form-urlencoded', 
    'Cookie': 'ts=216950; v1st=47258D7780AC95553BB31C2658863EED'
  },
  data : data
};

axios(config)
.then(function (response) {
  console.log(JSON.stringify(response.data));
  return res.send(response.data);
})
.catch(function (error) {
  console.log(error);
});


  }

  @Get()
  async findAll(@Req() req,@Res() res) {
    var data = this.videoInfoService.findAll();
    data.subscribe(function(result){
      if(result != null){
        const iResponse: IResponse = {
          statusCode: "200",
          message: "Fetch video List",
          data:result
        }
        res.send(iResponse);
      }else{
        const iResponse: IResponse = {
          statusCode: "404",
          message: "Data not found"
        }
        res.send(iResponse);
      }
  });
  }
  
}