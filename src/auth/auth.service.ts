import { Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { PrismaService } from "src/prisma/prisma.service";
import { UsuariosService } from "src/usuarios/usuarios.service";
import { LoginDto } from "./dto/loginDto.auth";
import * as bcrypt from 'bcrypt';
import { CreateUsuariosDto } from "src/usuarios/dto/create-usuario.dto";
import { UsuariosDto } from "src/usuarios/dto/usuarios.dto";


@Injectable()
export class authService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly usuarios: UsuariosService
  ) { }


  async login(loginDto: LoginDto): Promise<any> {
    try {
      const { correo,  contrase_a } = loginDto

const usuario = await this.prisma.usuario.findUnique({
  where: { correo: correo },
  include: {
    Rol: true
  }
});
      if (!usuario) {
        throw new NotFoundException('Usuario no encontrado');
      }
      const isPasswordValid = await bcrypt.compare( contrase_a, usuario.contrase_a);
     
      if (!isPasswordValid) {
        throw new UnauthorizedException('Contraseña no Valida');
      }

    return {
  token: this.jwtService.sign({
    usuarioId: usuario.usuarioId,
    nombreCompleto: usuario.nombreCompleto,
    correo: usuario.correo,
    rol: usuario.Rol.tipo
  })
}


    } catch (err) {
      throw err;
    }
  }

  async registro(dto: CreateUsuariosDto):Promise<any> {
    try {

    const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(dto.contrase_a, salt);
     const usuario = await this.usuarios.createUsuario(
   dto.nombreCompleto,
    dto.correo,
   hashedPassword,
   dto.usuarioAlta
  );   
      return usuario;
    } catch (err) {
        throw err;
    }
  }

  

}