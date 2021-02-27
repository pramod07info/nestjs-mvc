import { Inject, Injectable } from '@nestjs/common';
import {
  BaseModel,
  InjectModel,
  uuid,
  InjectConnection,
  errors,
  Repository,
  InjectRepository,
} from '@iaminfinity/express-cassandra';
import { UsersEntity } from '../entity/users.entity';
import { CreateUsersDto } from '../dto/create-users.dto';
import { UserTokenService } from './user-token.service';
import { CreateUsersTokenDto } from '../dto/create-user-token.dto';
import { IResponse } from '../response/IResponse';
import { Observable } from 'rxjs';
import { TokenRepository } from './token-repository';
import { UserTokenEntity } from 'src/entity/user-token.entity';
@Injectable()
export class UsersService {
  constructor(
    // @InjectConnection()
    // private readonly connection: any,
    @InjectRepository(TokenRepository)
    private readonly tokenRepository: TokenRepository,
    @InjectRepository(UsersEntity)
    private readonly usersRepository: Repository<UsersEntity>,
    
  ) { }

  async create(createUsersDto: CreateUsersDto){    
   return await this.usersRepository.save(createUsersDto,{if_not_exist:false});
  }

  findAll(): Observable<UsersEntity[]> {
    return  this.usersRepository.find({}, { raw: true });
  }

  findById(id): Observable<UsersEntity> {
    if (typeof id === 'string') {
      id = uuid(id);
    }
    return this.usersRepository.findOne({id:id});
  }
  createToken(userId):Observable<UserTokenEntity>{
    let createUsersTokenDto = new CreateUsersTokenDto();
    createUsersTokenDto.user_id = userId;
    createUsersTokenDto.token_data = uuid() + "" + uuid();
    createUsersTokenDto.is_active = true;
    return this.tokenRepository.createToken(createUsersTokenDto);
    
  }
  async updateUser(createUsersDto: CreateUsersDto) {
    try {
      // if (typeof createUsersDto.id === 'string') {
      //   createUsersDto.id = uuid(createUsersDto.id);
      // }
      let userData =  this.usersRepository.findOne({ id: uuid(createUsersDto.id) }, { raw: true });
      if (userData != null) {
        this.usersRepository.update({ id: uuid(createUsersDto.id) }, { email_id: createUsersDto.email_id, name: createUsersDto.name, mobile: createUsersDto.mobile, is_active: createUsersDto.is_active, roles: createUsersDto.roles });
        let user = await this.usersRepository.findOne({ id: uuid(createUsersDto.id) }, { raw: true });
        if (user) {
          const iResponse: IResponse = {
            statusCode: "200",
            message: "User updated successfuly",
            data: user
          }
          return iResponse;
        } else {
          const iResponse: IResponse = {
            statusCode: "200",
            message: "User not updated successfuly",
            data: ""
          }
          return iResponse;
        }
      } else {
        const iResponse: IResponse = {
          statusCode: "200",
          message: "User not found.",
          data: ""
        }
        return iResponse;
      }


    } catch (error) {
      const iResponse: IResponse = {
        statusCode: "200",
        message: error.message,
        data: ""
      }
      return iResponse;
    }

  }
  
  login(createUsersDto: CreateUsersDto):Observable<UsersEntity> {
    return  this.usersRepository.findOne({ email_id: createUsersDto.email_id, password: createUsersDto.password }, { raw: true, allow_filtering: true, select: ['id', 'name', 'nick_name', 'roles'] });
  }
  getToken(id):Observable<UserTokenEntity>{
    return this.tokenRepository.findByUserId(id);
  }
  // async logout(id) {
  //   try {
  //     let tokenDataResult = await this.usersTokenService.updateTokenStatus(id);
  //   } catch (error) {
  //     const iResponse: IResponse = {
  //       statusCode: "200",
  //       message: error.message,
  //       data: ""
  //     }
  //     return iResponse;
  //   }
    
  // }

}