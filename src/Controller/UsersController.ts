import { Body, Controller, Get, HttpException, HttpStatus, Param, Post, Req, Res, UseFilters } from '@nestjs/common';
import { UsersService } from '../service/users.service';
import { CreateUsersDto } from '../dto/create-users.dto'
import { CreateUsersTokenDto } from '../dto/create-user-token.dto'
import { ParseUuidPipe } from '../pipes/parse-uuid.pipe'
import { IResponse } from '../response/IResponse';
import { HttpErrorFilter } from 'src/shared/http-error.filter';
import { uuid } from '@iaminfinity/express-cassandra';

@Controller('user')
@UseFilters(new HttpErrorFilter())
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post()
  async create(@Req() req,@Res() res) {
      var data = this.usersService.create(req.body).catch(err => {
        throw new HttpException({
          message: err.message
        }, HttpStatus.BAD_REQUEST);
      });
    data.then(function(reslove){
      reslove.subscribe(function(result){
        if(result != null){
          const iResponse: IResponse = {
            statusCode: "201",
            message: "Successfully user register",
            data:result
          }
          res.send(iResponse);
        }else{
          const iResponse: IResponse = {
            statusCode: "404",
            message: "Data not found"
          }
          return res.send(iResponse);
        }
    });
    })
  }

  @Get()
  async findAll(@Req() req,@Res() res) {
    var data = this.usersService.findAll();
    data.subscribe(function(result){
      if(result != null){
        const iResponse: IResponse = {
          statusCode: "201",
          message: "Successfully user register",
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

  @Get(':id')
  findOne(@Param('id', new ParseUuidPipe()) id) {
    return this.usersService.findById(id);
  }
  @Post('/update')
  updateUser(@Body() createUsersDto:CreateUsersDto){
    return this.usersService.updateUser(createUsersDto);
  }
  @Post('/login')
  login(@Body() createUsersDto: CreateUsersDto,@Res() res) {
    try {
      var data = {
        token:{},
        user:{}
      }
      var user =  this.usersService.login(createUsersDto);
      user.subscribe((userResult)=>{
        if(userResult != null){
          var token = this.usersService.getToken(userResult.id);
          console.log(token);
           token.subscribe((tokenResult)=>{
             console.log("token ",tokenResult);
            if(tokenResult != undefined){
              console.log("kjdkashdsad");
              data.token = tokenResult;
              data.user = userResult;
              const iResponse: IResponse = {
                  statusCode: "200",
                  message: "Successfully Login",
                  data:data
                } 
             return res.send(iResponse);
            }else{
              console.log("else data")
              let createUsersTokenDto = new CreateUsersTokenDto();
              createUsersTokenDto.user_id = userResult.id;
              createUsersTokenDto.token_data = uuid() + "" + uuid();
              createUsersTokenDto.is_active = true;
              var token = this.usersService.createToken(userResult.id);
              token.subscribe((tokenResult)=>{
                data.token = tokenResult;
                data.user = userResult;
                const iResponse: IResponse = {
                  statusCode: "200",
                  message: "Successfully Login",
                  data:data
                }
                return res.send(iResponse);
               
              });
            }
          });
        }else{
          const iResponse: IResponse = {
            statusCode: "200",
            message: "Username Or password worng",
            data:""
          }
          return res.send(iResponse);
        }
       
      })
      
    } catch (error) {
      const iResponse: IResponse = {
        statusCode: "200",
        message: error.message,
        data:""
      }
      return res.send(iResponse);
    }
       
  }
  // @Post('/logout')
  // logout(@Body() createUsersTokenDto: CreateUsersTokenDto) {
  //   try {
  //     this.usersService.logout(createUsersTokenDto.user_id);
  //     const iResponse: IResponse = {
  //       statusCode: "200",
  //       message: "Successfully Logout"
  //     }
  //     return iResponse;
  //   } catch (error) {
  //     console.error(error.message);
  //     const iResponse: IResponse = {
  //       statusCode: "500",
  //       message: "Something went worng",
  //       error: error.message
  //     }
  //     return iResponse;
  //   }
  // }
}