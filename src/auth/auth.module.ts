import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { authService } from "./auth.service";
import { JwtModule } from "@nestjs/jwt";
import { UsuariosService } from "src/usuarios/usuarios.service";
import { PrismaService } from "src/prisma/prisma.service";
import { PrismaModule } from "src/prisma/prisma.module";

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET || 'supersecret',
      signOptions: { expiresIn: '1d' },
    }),
    PrismaModule
  ],
  controllers: [AuthController],
  providers: [authService, UsuariosService],
})
export class AuthModule {}