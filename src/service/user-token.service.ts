import { Global, Injectable } from '@nestjs/common';
import {
  BaseModel,
  InjectModel,
  uuid,
  InjectConnection,
  InjectRepository,
  Repository,
} from '@iaminfinity/express-cassandra';
import { UserTokenEntity } from '../entity/user-token.entity';
import { CreateUsersDto } from '../dto/create-users.dto';
import { CreateUsersTokenDto } from '../dto/create-user-token.dto';
import { promises } from 'fs';
import { Observable } from 'rxjs';

@Injectable()
export class UserTokenService {
  
  constructor(
    @InjectConnection()
    private readonly connection: any,
    
    @InjectRepository(UserTokenEntity)
    private readonly usersTokenModel: Repository<UserTokenEntity>,
  ) {}
  
  async create(createUsersTokenDto: CreateUsersTokenDto) {
    return  this.usersTokenModel.save(createUsersTokenDto);
     
  }
  
   findAll(): Observable<UserTokenEntity[]> {
    return this.usersTokenModel.find({});
  }

  findById(id): Observable<UserTokenEntity> {
    if (typeof id === 'string') {
      id = uuid(id);
    }
    return  this.usersTokenModel.findOne({ id }, { raw: true });
  }
   findByUserId(id): Observable<UserTokenEntity> {    
    return  this.usersTokenModel.findOne({ user_id:id,is_active:true }, { raw: true ,select:['id','user_id','token_data'],allow_filtering:true});
  }
  async updateTokenStatus(id) {
        if (typeof id === 'string') {
            id = uuid(id);
        }
        let tokenData =   await this.usersTokenModel.findOne({ user_id:id,is_active:true }, { raw: true ,select:['id','user_id','token_data'],allow_filtering:true});
        tokenData.subscribe(function(result){
          if(result != null){
             this.usersTokenModel.update({id:result.id,user_id:id},{is_active:false})
        }  
        })
        
    }
}

