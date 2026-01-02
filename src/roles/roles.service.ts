import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import type { RolModel } from '../../generated/prisma/models/Rol';
import { CreateRoleDto } from "./dto/create-role.dto";
import { ApiResponse } from "src/global/response/response";
@Injectable()
export class RolesService {

  constructor(private prisma: PrismaService) { }
  async getAllRoles(): Promise<ApiResponse<RolModel[]>> {
    try {
      const roles = await this.prisma.rol.findMany();
      if (!roles || roles.length === 0) {
        throw new NotFoundException('No se encontraron roles');
      } else {
        return {
          status: 200,
          message: 'Roles obtenidos correctamente',
          data: roles,
        };
      }

    } catch (err) {
      throw err;
    }
  }

  async getRolesById(id: number): Promise<ApiResponse<RolModel[]>> {
    try {
      const role = await this.prisma.rol.findUnique({ where: { rolId: id } });
      return {
        status: 200,
        message: 'Rol obtenido correctamente',
        data: role? [role]: [],
      }
    } catch (err) {
      throw err;
    }
  }

  async createRole(tipo: string): Promise<ApiResponse<RolModel[]>> {
    try {
      const roleCreated = await this.prisma.rol.create({ data: { tipo } });
      return {
        status: 201,
        message: 'Rol creado correctamente',
        data: [roleCreated],
      };
    } catch (err) {
      throw err;
    }
  }

  async updateRole(id: number, tipo: string): Promise<ApiResponse<RolModel[]>> {
    try {
      const roleUpdated = await this.prisma.rol.update({
        where: { rolId: id },
        data: { tipo },
      });
      return {
        status: 200,
        message: 'Rol actualizado correctamente',
        data: [roleUpdated],
      };
    } catch (err) {
      throw err;
    }
  }


  async deleteRole(id: number): Promise<ApiResponse<RolModel[]>> {
    try {
      const roleDeleted = await this.prisma.rol.delete({ where: { rolId: id } });
      return {
        status: 200,
        message: 'Rol eliminado correctamente',
        data: [roleDeleted],
      };
    } catch (err) {
      throw err;
    }

  }



}