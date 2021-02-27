
  import { 
    Entity,
    Column,
    GeneratedUUidColumn,
    CreateDateColumn,
    UpdateDateColumn,
    IndexColumn,
    VersionColumn,
  } from '@iaminfinity/express-cassandra';
  
  @Entity({
    table_name: 'user',
    key: ['id','email_id'],
  })
  export class UsersEntity {
    @GeneratedUUidColumn()
    id: any;
  
    @Column({
      type: 'text',
    })
    name: string;
  
    @Column({
      type: 'text',
    })
    nick_name: string;
  
    @Column({
      type: 'text',
    })
    mobile: string;

    @Column({
        type: 'text',
      })    
    email_id: string;

    @Column({
        type: 'text',
    })
    password: string;

    @Column({
        type: 'boolean',
    })
    is_active: boolean;

    @Column({
      type: 'text',
    })
    roles: Set<any>;

    @CreateDateColumn()
    created_at: Date;
  
    @UpdateDateColumn()
    updated_at: Date;
  
    @VersionColumn()
    __v1: any;
  }