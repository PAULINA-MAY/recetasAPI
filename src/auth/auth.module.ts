import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { authService } from "./auth.service";
import { JwtModule } from "@nestjs/jwt";
import { UsuariosService } from "src/usuarios/usuarios.service";
import { PrismaService } from "src/prisma/prisma.service";
import { JwtStrategy } from "./jwtAuthConfig.auth";
import { ConfigService } from "@nestjs/config";
import { PrismaModule } from "src/prisma/prisma.module";


@Module({
 imports: [
    JwtModule.registerAsync({
      global: true,
 useFactory: (configService: ConfigService) => {
return {
  secret: configService.get<string>('jwt.secret'),
  signOptions: { expiresIn: '3d' },
};
      },
      
      inject: [ConfigService],
    }),
    PrismaModule

  ], 
  controllers: [AuthController],
  providers: [authService, UsuariosService, JwtStrategy],
})
export class AuthModule {}