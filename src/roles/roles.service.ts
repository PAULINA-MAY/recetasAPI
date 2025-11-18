import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import type { RolModel } from '../../generated/prisma/models/Rol';
import { CreateRoleDto } from "./dto/create-role.dto";
@Injectable()
export class RolesService{

    constructor(private prisma: PrismaService){}
    async getAllRoles(): Promise<RolModel[]>{
       try {
         return this.prisma.rol.findMany();
       } catch (err) {
         throw err;
       }
    }

    async createRole(tipo: string): Promise<RolModel> {
    try {
         return this.prisma.rol.create({ data: { tipo } });
    } catch (err) {
        throw err;
    }
    }

    async updateRole(id:number, tipo:string): Promise<RolModel> {
      try {
        return this.prisma.rol.update({
          where: { rolId: id },
          data: { tipo },
        });
      } catch (err) {
        throw err;
      }
    }




}