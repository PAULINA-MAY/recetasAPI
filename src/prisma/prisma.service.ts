import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrismaMssql } from '@prisma/adapter-mssql';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  constructor() {

    
    // Parse sqlserver:// URI format
    let server = process.env.SERVER ;
    let port =  parseInt(process.env.SERVER_PORT!, 10);
    let database = process.env.DATABASE ;
    let userName = process.env.USERNAMEPERSONAL;
    let password = process.env.PASSWORD;
    let encrypt = false;
    let trustServerCertificate = false;


    const adapter = new PrismaMssql({
      server,
      port,
      database,
      authentication: {
        type: 'default',
        options: {
          userName,
          password,
        },
      },
      options: {
        encrypt,
        trustServerCertificate,
      },
    });

    super({ adapter });
  }

  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
