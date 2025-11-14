import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import type { RolModel } from '../../generated/prisma/models/Rol';
@Injectable()
export class RolesService{

    constructor(private prisma: PrismaService){}
    async getAllRoles(): Promise<RolModel[]>{
       try {
         return this.prisma.rol.findMany();
       } catch (error) {
         throw error;
       }
    }

    async createRole(tipo: string): Promise<RolModel> {
    try {
         return this.prisma.rol.create({ data: { tipo } });
    } catch (error) {
        throw error;
    }
    }

    

}