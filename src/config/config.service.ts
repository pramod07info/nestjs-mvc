import {Injectable} from '@nestjs/common';

import {
    ExpressCassandraOptionsFactory,
    ExpressCassandraModuleOptions,
    ExpressCassandraModule
} from '@iaminfinity/express-cassandra'

export class ConfigService implements ExpressCassandraOptionsFactory{

    createExpressCassandraOptions():
        | ExpressCassandraModuleOptions
        | Promise<ExpressCassandraModuleOptions> {
        return this.getDbConfig1();
    }

    getDbConfig1(): any {
        return {
          clientOptions: {
            contactPoints: ['localhost'],
            keyspace: 'uploader',
            protocolOptions: {
              port: 9042,
            },
            queryOptions: {
              consistency: 1,
            },
          },
          ormOptions: {
            createKeyspace: true,
            defaultReplicationStrategy: {
              class: 'SimpleStrategy',
              replication_factor: 1,
            },
            migration: 'alter',
          },
        };
      }
      getDbConfig2(): any {
        return {
          clientOptions: {
            contactPoints: ['localhost'],
            keyspace: 'test2',
            protocolOptions: {
              port: 9042,
            },
            queryOptions: {
              consistency: 1,
            },
          },
          ormOptions: {
            createKeyspace: true,
            defaultReplicationStrategy: {
              class: 'SimpleStrategy',
              replication_factor: 1,
            },
            migration: 'alter',
          },
        };
      }
}