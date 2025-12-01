import { Get, Injectable, NotFoundException } from "@nestjs/common";
import { ApiOkResponse, ApiOperation } from "@nestjs/swagger";
import { UsuarioModel } from "generated/prisma/models";
import { PrismaService } from "src/prisma/prisma.service";
import { UsuariosDto } from "./dto/usuarios.dto";
import { CreateUsuariosDto } from "./dto/create-usuario.dto";
import { Usuario } from "generated/prisma/wasm";

@Injectable()
export class UsuariosService{

    constructor(private prisma:PrismaService){}
    async getAllUsuarios():Promise<UsuarioModel[]>{
        try {
            return this.prisma.usuario.findMany();
        } catch (err) {
            throw err;
        }
    }
    //Pendiente:Revisar bloc de notas
    async getUsuariosById(id:number):Promise<UsuarioModel[]>{
        try {
            return this.prisma.usuario.findMany({ where: { usuarioId: id } });
        } catch (err) {
            throw err;
        }
    }
    async createUsuario(data:UsuariosDto): Promise<UsuarioModel> {
        try {
                        const user = await this.prisma.usuario.findUnique({
              where: { nombreCompleto: data.nombreCompleto }
            })
            if (!user) {
              throw new NotFoundException('Usuario no encontrado')
            }
            
               return await this.prisma.usuario.create({
                data: {
                    rolIdFK: data.rolIdFK,
                    nombreCompleto: data.nombreCompleto,
                    correo: data.correo,
                    contrase_a: data.contrase_a, 
                },
                });
            
        } catch (err) {
              throw err;
        }
    }

    

}
