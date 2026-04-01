import { ConflictException, Get, Injectable, NotFoundException } from "@nestjs/common";
import { ApiOkResponse, ApiOperation } from "@nestjs/swagger";

import { PrismaService } from "src/prisma/prisma.service";
import { UsuariosDto } from "./dto/usuarios.dto";
import * as bcrypt from 'bcrypt';
import { CreateUsuariosDto } from "./dto/create-usuario.dto";

import { ApiResponse } from "src/global/response/response";

@Injectable()
export class UsuariosService {

    constructor(private prisma: PrismaService) { }
    async getAllUsuarios(): Promise<ApiResponse<UsuariosDto[]>> {
        try {
const usuarios = await this.prisma.usuario.findMany({
      select: {
        usuarioId: true,
        rolIdFK:true,
        nombreCompleto: true,
        correo: true,
        fechaDeCreacion: true,
        Rol: {                
          select: {
            tipo: true,
          }
        }
      }
    });
            if (!usuarios || usuarios.length === 0) {
                throw new NotFoundException('No se encontraron usuarios');
            } else {
                return {
                    status: 200,
                    message: 'Usuarios obtenidos correctamente',
                    data: usuarios,
                };
            }

        } catch (err) {
            throw err;
        }
    }
async getUsuariosById(id: number): Promise<ApiResponse<UsuariosDto[]>> {
  try {

    const user = await this.prisma.usuario.findUnique({
      where: { usuarioId: id },
      select: {
        usuarioId: true,
        rolIdFK: true,
        nombreCompleto: true,
        correo: true,
        fechaDeCreacion: true
      }
    });

    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }

    return {
      status: 200,
      message: 'Usuarios obtenidos correctamente',
      data: [user],
    };

  } catch (err) {
    throw err;
  }
}
    async createUsuario( 
  data: CreateUsuariosDto): Promise<ApiResponse<any>> {

        try {
            const user = await this.prisma.usuario.findUnique({
                where: { nombreCompleto: data.nombreCompleto }
            })
            if (user) {
                throw new ConflictException('El usuario ya existe');
            } else {
          await this.prisma.usuario.create({
                    data: {
                        rolIdFK: 3,//usuario común
                        nombreCompleto: data.nombreCompleto,
                        correo: data.correo,
                        contrase_a: data.contrase_a,
                    }
                });
                return {
                    status: 201,
                    message: 'Usuario creado correctamente',
                    data: [],
                };
            }
        } catch (err) {

            throw err;
        }
    }
    async updateUsuario(id: number, nombre: string,correo: string, contrase_a?: string,): Promise<ApiResponse<any>> {
        try {
            const usuario = await this.prisma.usuario.findUnique({
                where: { usuarioId: id },
            });

            // Verificar si el usuario existe
            if (!usuario) {
                throw new NotFoundException('Usuario no encontrado');
            }

            let passwordFinal = usuario.contrase_a;
            //Condición: si la contrase_a viene vacia o nula no se actualiza
            if (contrase_a && contrase_a.trim() !== '') {
                const salt = await bcrypt.genSalt();
                passwordFinal = await bcrypt.hash(contrase_a, salt);
            }

            const userUpdated = await this.prisma.usuario.update({
                where: { usuarioId: id },
                data: {
                    nombreCompleto: nombre,
                    correo: correo,
                    contrase_a: passwordFinal,
                },
            });

            return {
                status: 200,
                message: 'Usuario actualizado correctamente',
                data: [userUpdated],
            };
        } catch (err) {
            throw err;
        }
    }
    async deleteUsuario(id: number): Promise<ApiResponse<any[]>> {
        try {
            const usuario = await this.prisma.usuario.findUnique({
                where: { usuarioId: id },
            });
            // Verificar si el usuario existe
            if (!usuario) {
                throw new NotFoundException('Usuario no encontrado');
            }

            const userDeleted = await this.prisma.usuario.delete({
                where: { usuarioId: id },
            });
            return {
                status: 200,
                message: 'Usuario eliminado correctamente',
                data: [userDeleted],
            };
        } catch (err) {
            throw err;
        }
    }




}
