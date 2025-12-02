import { Injectable, NotFoundException } from "@nestjs/common";
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
      const { nombreCompleto,  contrase_a } = loginDto

      const usuario = await this.prisma.usuario.findUnique({
        where: { nombreCompleto }
      })
      if (!usuario) {
        throw new NotFoundException('Usuario no encontrado')
      }
      const isPasswordValid = await bcrypt.compare( contrase_a, usuario.contrase_a);

      if (!isPasswordValid) {
        throw new NotFoundException('Contraseña no Valida')
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

  async registro(createUsuarioDto: CreateUsuariosDto):Promise<any> {
    try {
    const createUser = new UsuariosDto();
    createUser.rolIdFK = 1;
    createUser.nombreCompleto = createUsuarioDto.nombreCompleto;
    createUser.correo = createUsuarioDto.correo;
    const salt = await bcrypt.genSalt();
    createUser.contrase_a = await bcrypt.hash(createUsuarioDto.contrase_a, salt);
     const usuario = await this.usuarios.createUsuario(createUser);   
      return usuario;
    } catch (err) {
        throw err;
    }
  }

  

}