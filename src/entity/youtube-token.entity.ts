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
    table_name: 'youtube_token',
    key: ['id'],
  })
  export class YoutubeTokenEntity {
    @GeneratedUUidColumn()
    id: any;
  
    @Column({
      type: 'text',
    })
    @IndexColumn()
    access_token: string;
  
    @Column({
        type: 'text',
      })
    scope: string;

    @Column({
        type: 'text',
      })
      token_type: string;

    @Column({
        type: 'text',
      })
    id_token: string;

    @CreateDateColumn()
    created_at: Date;
  
    @UpdateDateColumn()
    updated_at: Date;
  
    @VersionColumn()
    __v1: any;
  }