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
    table_name: 'youtube_credentials',
    key: ['id'],
  })
  export class YoutubeCredentialsEntity {
    @GeneratedUUidColumn()
    id: any;
  
    @Column({
      type: 'uuid',
    })
    user_id:any;

    @Column({
        type: 'text',
    })
    @IndexColumn()
    client_id: string;
  
    @Column({
        type: 'text',
      })
    project_id: string;

    @Column({
        type: 'text',
      })
      auth_uri: string;

    @Column({
        type: 'text',
      })
    token_uri: string;

    @Column({
        type: 'text',
      })
    auth_provider_x509_cert_url: string;

    @Column({
        type: 'text',
      })
    client_secret: string;

    @Column({
        type: 'text',
      })
    redirect_uris: string;

    @Column({
        type: 'text',
      })
    javascript_origins: string;

    @Column({
        type: 'text',
      })
    status: string;

    @CreateDateColumn()
    created_at: Date;
  
    @UpdateDateColumn()
    updated_at: Date;
  
    @VersionColumn()
    __v1: any;
  }



  