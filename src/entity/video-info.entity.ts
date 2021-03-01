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
    table_name: 'video_info',
    key: ['id'],
  })
  export class VideoInfoEntity {
    @GeneratedUUidColumn()
    id: any;
  
    @Column({
      type: 'uuid',
    })
    user_id:any;

    @Column({
        type: 'text',
    })
    url: string;
  
    @Column({
        type: 'text',
      })
    status: string;

    @Column({
        type: 'text',
      })
    youtube_status: string;

    @Column({
        type: 'text',
      })
    dailymotion_status: string;

    @CreateDateColumn()
    created_at: Date;
  
    @UpdateDateColumn()
    updated_at: Date;
  
    @VersionColumn()
    __v1: any;
  }



  