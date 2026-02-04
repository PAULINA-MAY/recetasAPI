import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { PrismaClientExceptionFilter } from './prisma-client-exception/prisma-client-exception.filter';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {

  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  app.enableShutdownHooks()
  const options = new DocumentBuilder()
    .setTitle(configService.get<any>('app.name'))
    .setDescription('API para la gestión de recetas de cocina')
    .setVersion('1.0')
    .addTag('recetas')
     .addBearerAuth(
    {
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
      in: 'header',
    },
    'access-token', 
  )
    .build();
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('', app, document);

  const cors ={
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  }
  app.enableCors(cors);

  const httpAdapterHost = app.get(HttpAdapterHost);
  app.useGlobalFilters(new PrismaClientExceptionFilter(httpAdapterHost));
  await app.listen(configService.get<number>('app.port') ?? 4000);
}
bootstrap();
