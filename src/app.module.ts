import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RolesModule } from './roles/roles.module';
import { UsuariosModule } from './usuarios/usuarios.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import config from './config/configuration.config';
import { RecetaModule } from './receta/receta.module';
import { IngredienteModule } from './ingrediente/ingrediente.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { PasoModule } from './paso/paso.module';
import { PuntuacionModule } from './puntuacion/puntuacion.module';
import { ChatGatewayModule } from './chatGateway/chatGateway.module';

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [config], envFilePath: '.env', }),

    RolesModule,
    AuthModule,
    UsuariosModule,
    RecetaModule,
    IngredienteModule,
    CloudinaryModule,
    PasoModule,
    PuntuacionModule,
    ChatGatewayModule

  ],
})
export class AppModule { }
