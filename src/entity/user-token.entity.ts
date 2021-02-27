import {
    Entity,
    Column,
    GeneratedUUidColumn,
  } from '@iaminfinity/express-cassandra';
  
  @Entity({
    table_name: 'usertoken',
    key: ['id','user_id'],
    options: {
      timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at',
      },
      // versions: {
      //   key: '__v1',
      // },
    },
  })
  export class UserTokenEntity {
    @GeneratedUUidColumn()
    id: any;
  
    @Column({
      type: 'uuid',
    })
    user_id: any;
  
    @Column({
      type: 'text',
    })
    token_data: string;

    @Column({
        type: 'boolean',
    })
    is_active: boolean;
  }