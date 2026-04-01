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
        where: { correo: correo }
      })
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
    correo: usuario.correo
  })
}


    } catch (err) {
      throw err;
    }
  }

  async registro(nombreCompleto: string, correo: string, contrase_a: string):Promise<any> {
    try {

    const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(contrase_a, salt);
     const usuario = await this.usuarios.createUsuario({
    nombreCompleto: nombreCompleto,
    correo: correo,
    contrase_a: hashedPassword,
  });   
      return usuario;
    } catch (err) {
        throw err;
    }
  }

  

}