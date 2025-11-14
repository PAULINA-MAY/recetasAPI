import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
   app.enableShutdownHooks()
  const options = new DocumentBuilder()
    .setTitle('Recetas API')
    .setDescription('API para la gestión de recetas de cocina')
    .setVersion('1.0')
    .addTag('recetas')
    .build();

    app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('api', app, document);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
