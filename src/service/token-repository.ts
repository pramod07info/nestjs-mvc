import { Repository, EntityRepository } from '@iaminfinity/express-cassandra';
import { Observable } from 'rxjs';
import { CreateUsersTokenDto } from 'src/dto/create-user-token.dto';
import { UserTokenEntity } from 'src/entity/user-token.entity';

@EntityRepository(UserTokenEntity)
export class TokenRepository extends Repository<UserTokenEntity> {
  findById(id: any): Observable<UserTokenEntity> {
    return this.findOne({ id: id });
  }
  findByUserId(id): Observable<UserTokenEntity> {    
    return  this.findOne({ user_id:id,is_active:true }, { raw: true ,select:['id','user_id','token_data','is_active','created_at'],allow_filtering:true});
  }
  createToken(createUsersTokenDto: CreateUsersTokenDto): Observable<UserTokenEntity> {
    return  this.save(createUsersTokenDto);
     
  }
}