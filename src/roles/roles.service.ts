import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

import { CreateRoleDto } from "./dto/create-role.dto";
import { ApiResponse } from "src/global/response/response";
import { RequestCreateRoleDto } from "./dto/role.dto";
@Injectable()
export class RolesService {

  constructor(private prisma: PrismaService) { }
async getAllRoles(): Promise<ApiResponse<RequestCreateRoleDto[]>> {
  const role = await this.prisma.rol.findMany();

  if (!role || role.length === 0) {
    throw new NotFoundException('No se encontraron roles');
  }

 
  const res: RequestCreateRoleDto[] = role.map(role => ({
    rolId: role.rolId,
    tipo: role.tipo,
    usuarioAlta: role.usuarioAlta!, 
    fechaCreacion: role.fechaDeCreacion!,
    estatus: role.estatus || 'AC',
  }));

  return {
    status: 200,
    message: 'Roles obtenidos correctamente',
    data: res,
  };
}

async getRolesById(id: number): Promise<ApiResponse<RequestCreateRoleDto>> {
  try {
    const roleRaw = await this.prisma.rol.findUnique({
      where: { rolId: id },
    });

    if (!roleRaw) {
      throw new NotFoundException('No se encontraron roles');
    }

    const role: RequestCreateRoleDto = {
      rolId: roleRaw.rolId,
      tipo: roleRaw.tipo,
      usuarioAlta: roleRaw.usuarioAlta!,
      fechaCreacion: roleRaw.fechaDeCreacion!,
      estatus: roleRaw.estatus!,
    };

    return {
      status: 200,
      message: 'Rol obtenido correctamente',
      data: role,
    };
  } catch (err) {
    throw err;
  }
}

async createRole(dto: CreateRoleDto): Promise<ApiResponse<RequestCreateRoleDto>> {

  const createRole = await this.prisma.rol.create({
    data: {
      tipo: dto.tipo,
      usuarioAlta: dto.usuarioAlta
    },
  });

  const res: RequestCreateRoleDto = {
    rolId: createRole.rolId,
    tipo: createRole.tipo,
    usuarioAlta: createRole.usuarioAlta!,
    fechaCreacion: createRole.fechaDeCreacion!,
    estatus: createRole.estatus!,
  };


  return {
    status: 200,
    message: 'Rol creado correctamente',
    data: res,
  };
}

  async updateRole(id: number, tipo: string): Promise<ApiResponse<any>> {
    try {
          const role = await this.prisma.rol.findUnique({
      where: { rolId: id },
    });

    if (!role) {
      return {
        status: 404,
        message: 'El rol no existe',
        data: [],
      };
    }

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


  async deleteRole(id: number): Promise<ApiResponse<any>> {
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