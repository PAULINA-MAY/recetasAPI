import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RolesModule } from './roles/roles.module';
import { UsuariosModule } from './usuarios/usuarios.module';
import { AuthModule } from './auth/auth.module';


@Module({
controllers: [AppController],
  providers: [AppService],
  imports: [RolesModule,UsuariosModule, AuthModule ],
})
export class AppModule {}
