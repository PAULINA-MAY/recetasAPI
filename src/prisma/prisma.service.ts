import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrismaMssql } from '@prisma/adapter-mssql';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  constructor() {
    const connectionString = process.env.DATABASE_URL || '';
    
    // Parse sqlserver:// URI format
    let server = 'localhost';
    let port = 1433;
    let database = 'RECETAS';
    let userName = 'pauDev';
    let password = 'PauDBA2025';
    let encrypt = false;
    let trustServerCertificate = false;

    try {
      // Extract credentials and host:port from URI
      const uriMatch = connectionString.match(/sqlserver:\/\/([^:]+):([^@]+)@([^:]+):(\d+)(.*)?/);
      
      if (uriMatch) {
        userName = uriMatch[1];
        password = uriMatch[2];
        server = uriMatch[3];
        port = parseInt(uriMatch[4], 10);
        
        // Parse remaining parameters
        const params = uriMatch[5] || '';
        const paramPairs = params.split(';').filter(p => p.trim());
        
        paramPairs.forEach((pair) => {
          const [key, value] = pair.split('=');
          if (!key || !value) return;
          
          const normalizedKey = key.trim().toLowerCase();
          const normalizedValue = value.trim().toLowerCase();
          
          if (normalizedKey === 'initial catalog') database = value.trim();
          if (normalizedKey === 'database') database = value.trim();
          if (normalizedKey === 'encrypt') encrypt = normalizedValue === 'true';
          if (normalizedKey === 'trustservercertificate') trustServerCertificate = normalizedValue === 'true';
        });
      }
    } catch (error) {
      console.error('Error parsing DATABASE_URL:', error);
    }

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
