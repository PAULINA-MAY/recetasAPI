import { ConflictException, Get, Injectable, NotFoundException } from "@nestjs/common";
import { ApiOkResponse, ApiOperation } from "@nestjs/swagger";

import { PrismaService } from "src/prisma/prisma.service";
import { UsuariosDto } from "./dto/usuarios.dto";
import * as bcrypt from 'bcrypt';
import { CreateUsuariosDto, ResponseCreateUsuarioDto } from "./dto/create-usuario.dto";

import { ApiResponse } from "src/global/response/response";
import { ResponseUpdateUsuarioDto, UpdateUsuariosDto } from "./dto/update-usuario.dto";
import { DeleteUsuarioDto, ResponseDeleteUsuarioDto } from "./dto/delete-usuario.dto";

@Injectable()
export class UsuariosService {

    constructor(private prisma: PrismaService) { }
async getUsuariosAc(): Promise<ApiResponse<any[]>> {
    try {
 const usuarios = await this.prisma.usuario.findMany({
      where: { estatus: 'AC' },
      select: {
        usuarioId: true,
        rolIdFK: true,
        nombreCompleto: true,
        correo: true,
        fechaDeCreacion: true,
        estatus: true,
        UsuarioAlta: true,
        Rol: {
      select: {
        tipo: true, 
      },
    },
      },
    });

  
    if (!usuarios || usuarios.length === 0) {
      return {
        status: 404,
        message: 'No se encontraron usuarios activos',
        data: [],
      };
    }

    return {
      status: 200,
    message: 'Usuarios obtenidos correctamente',
      data:  usuarios,
    };
    }
      catch (err) {

      throw err;
    }
  }

    async getUsuariosBa(): Promise<ApiResponse<any[]>> {
    try {
 const usuarios = await this.prisma.usuario.findMany({
      where: { estatus: 'BA' },
      select: {
        usuarioId: true,
        rolIdFK: true,
        nombreCompleto: true,
        correo: true,
        fechaDeCreacion: true,
        estatus: true,
        UsuarioAlta: true,
         Rol: {
      select: {
        tipo: true, 
      },
    },
      },
    });

  
    if (!usuarios || usuarios.length === 0) {
      return {
        status: 404,
        message: 'No se encontraron usuarios inactivos',
        data: [],
      };
    }

    return {
      status: 200,
      message: 'Usuarios obtenidos correctamente',
      data: usuarios,
    };
    }
      catch (err) {

      throw err;
    }
  }

async getUsuariosById(id: number): Promise<ApiResponse<ResponseCreateUsuarioDto>> {
  try {

    const user = await this.prisma.usuario.findUnique({
      where: { usuarioId: id },
      select: {
        usuarioId: true,
        rolIdFK: true,
        nombreCompleto: true,
        correo: true,
        fechaDeCreacion: true,
        estatus:true,
        UsuarioAlta: true,
      }
    });

    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }

    
        const res: ResponseCreateUsuarioDto = {
                usuarioId: user.usuarioId,
          rolIdFK: user.rolIdFK,
          nombreCompleto: user.nombreCompleto,
          correo: user.correo,
          fechaDeCreacion: user.fechaDeCreacion!,
          usuarioAlta: user.UsuarioAlta!,
          estatus: user.estatus!,
        };

    return {
      status: 200,
      message: 'Usuarios obtenidos correctamente',
      data: res,
    };

  } catch (err) {
    throw err;
  }
}
    async createUsuario( 
 nombreCompleto: string, correo: string, contrase_a: string, usuarioAlta: string): Promise<ApiResponse<ResponseCreateUsuarioDto>> {

        try {
            const user = await this.prisma.usuario.findUnique({
                where: { nombreCompleto: nombreCompleto }
            })
            if (user) {
                throw new ConflictException('El usuario ya existe');
            } 


            const MERIDA_OFFSET_MS = -6 * 60 * 60 * 1000;

const now = new Date();
const localDate = new Date(now.getTime() + MERIDA_OFFSET_MS);

        const usuario =  await this.prisma.usuario.create({
                    data: {
                        rolIdFK: 3,
                        nombreCompleto: nombreCompleto,
                        correo: correo,
                        contrase_a: contrase_a,
                        UsuarioAlta: usuarioAlta,
                        fechaDeCreacion: localDate,
                    }
                });

                const res: ResponseCreateUsuarioDto = {
                usuarioId: usuario.usuarioId,
          rolIdFK: usuario.rolIdFK,
          nombreCompleto: usuario.nombreCompleto,
          correo: usuario.correo,
          fechaDeCreacion: usuario.fechaDeCreacion!,
          usuarioAlta: usuario.UsuarioAlta!,
          estatus: usuario.estatus!,
        };
                return {
                    status: 201,
                    message: 'Usuario creado correctamente',
                    data: res,
                };
            
        } catch (err) {

            throw err;
        }
    }
    async updateUsuario(idUsuario:number,dto: UpdateUsuariosDto): Promise<ApiResponse<any>> {
        try {
            const usuario = await this.prisma.usuario.findUnique({
                where: { usuarioId: idUsuario },
            });

            // Verificar si el usuario existe
            if (!usuario) {
                throw new NotFoundException('Usuario no encontrado');
            }

            let passwordFinal = usuario.contrase_a;
            //Condición: si la contrase_a viene vacia o nula no se actualiza
            if (dto.contrase_a && dto.contrase_a.trim() !== '') {
                const salt = await bcrypt.genSalt();
                passwordFinal = await bcrypt.hash(dto.contrase_a, salt);
            }
            const MERIDA_OFFSET_MS = -6 * 60 * 60 * 1000;

const now = new Date();
const localDate = new Date(now.getTime() + MERIDA_OFFSET_MS);

            const userUpdated = await this.prisma.usuario.update({
                where: { usuarioId: idUsuario },
                data: {
                    nombreCompleto: dto.nombreCompleto,
                    correo: dto.correo,
                    contrase_a: passwordFinal,
                    fechaMod: localDate,
                    UsuarioMod: dto.usuarioMod,

                },
            });


               const res: ResponseUpdateUsuarioDto = {
                usuarioId: userUpdated.usuarioId ,
                rolIdFK: userUpdated.rolIdFK,
                nombreCompleto: userUpdated.nombreCompleto,
                correo: userUpdated.correo,
                usuarioMod: userUpdated.UsuarioMod!,
                fechaMod: userUpdated.fechaMod!,
                estatus: userUpdated.estatus!,
              };
            return {
                status: 200,
                message: 'Usuario actualizado correctamente',
                data: res,
            };
        } catch (err) {
            throw err;
        }
    }
    async deleteUsuario(idUsuario: number, dto: DeleteUsuarioDto): Promise<ApiResponse<any[]>> {
        try {
            const usuario = await this.prisma.usuario.findUnique({
                where: { usuarioId: idUsuario },
            });
            // Verificar si el usuario existe
            if (!usuario) {
                throw new NotFoundException('Usuario no encontrado');
            }

                  const MERIDA_OFFSET_MS = -6 * 60 * 60 * 1000;

const now = new Date();
const localDate = new Date(now.getTime() + MERIDA_OFFSET_MS);

            const userBaja = await this.prisma.usuario.update({ where: { usuarioId: idUsuario }, data: { estatus: 'BA', UsuarioBaja: dto.usuarioBaja, fechaBaja: localDate } });
            const res: ResponseDeleteUsuarioDto = {
                usuarioId: userBaja.usuarioId ,
                rolIdFK: userBaja.rolIdFK,
                nombreCompleto: userBaja.nombreCompleto,
                correo: userBaja.correo,
                usuarioBaja: userBaja.UsuarioBaja!,
                fechaBaja: userBaja.fechaBaja!,
                estatus: userBaja.estatus!,
              };
            return {
                status: 200,
                message: 'Usuario eliminado correctamente',
                data: [res],
            };
        } catch (err) {
            throw err;
        }
    }




}
