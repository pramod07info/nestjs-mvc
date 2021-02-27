import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateUsersDto } from '../dto/create-users.dto'
import { UsersEntity } from '../entity/users.entity';
import { ParseUuidPipe } from '../pipes/parse-uuid.pipe'
import { UserTokenService } from 'src/service/user-token.service';
import { CreateUsersTokenDto } from 'src/dto/create-user-token.dto';
import { uuid } from '@iaminfinity/express-cassandra';

@Controller('usertoken')
export class UserTokenController {
  constructor(private readonly userTokenService:UserTokenService) {}

  //@Post()
  async create(createUsersDto: CreateUsersTokenDto) {
    return this.userTokenService.create(createUsersDto);
  }

 

//   @Post('/login')
//   login(@Body() createUsersDto:CreateUsersDto) {
//     let user =  this.userTokenService.login(createUsersDto);
//     console.log("user",user);
//     user.then(function(result){
//       if(result != null){
//         let tokens = this.userTokenService.findByUserId(result.id);
//         tokens.then(function(tokensData){
//           if(tokensData != null){
//               return tokens;
//           }else{
//             let createUsersTokenDto = new CreateUsersTokenDto();
//             createUsersTokenDto.userId = result.id;
//             createUsersTokenDto.tokenData = uuid()+""+ uuid();
//             createUsersTokenDto.isActive = true;
//             this.userTokenService.create(createUsersTokenDto);
//             console.log("createUsersTokenDto ",createUsersTokenDto);
//             return createUsersTokenDto;
//           }
//         })
//       }

//     })
//     return user;
//   }
}