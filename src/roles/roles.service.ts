import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

import { CreateRoleDto, ResponseCreateRoleDto } from "./dto/create-role.dto";
import { ApiResponse } from "src/global/response/response";

import { ResponseUpdateRoleDto, UpdateRoleDto } from "./dto/update-role.dto";
import { DeleteRoleDto, ResponseDeleteRoleDto } from "./dto/delete-role.dto";


@Injectable()
export class RolesService {

  constructor(private prisma: PrismaService) { }

  async getRolesAc(): Promise<ApiResponse<any[]>> {
    try {
 const rol = await this.prisma.rol.findMany({
      where: { estatus: 'AC' },
      select: {
        rolId: true,
        tipo: true,
        usuarioAlta: true,
        fechaDeCreacion: true,
        estatus: true,
      },
    });

  
    if (!rol || rol.length === 0) {
      return {
        status: 404,
        message: 'No se encontraron roles activos',
        data: [],
      };
    }

    return {
      status: 200,
      message: 'Roles obtenidos correctamente',
      data: rol,
    };
    }
      catch (err) {

      throw err;
    }
  }

    async getRolesBa(): Promise<ApiResponse<any[]>> {
    try {
 const rol = await this.prisma.rol.findMany({
      where: { estatus: 'BA' },
      select: {
        rolId: true,
        tipo: true,
        usuarioAlta: true,
        fechaDeCreacion: true,
        estatus: true,
      },
    });

  
    if (!rol || rol.length === 0) {
      return {
        status: 404,
        message: 'No se encontraron roles inactivos',
        data: [],
      };
    }

    return {
      status: 200,
      message: 'Roles obtenidos correctamente',
      data: rol,
    };
    }
      catch (err) {

      throw err;
    }
  }

async getRolesById(id: number): Promise<ApiResponse<ResponseCreateRoleDto>> {
  try {
   const roleRaw = await this.prisma.rol.findFirst({
  where: {
    rolId: id,
    estatus: 'AC',
  },
});
    if (!roleRaw) {
      throw new NotFoundException('EL rol no existe o no esta activo');
    }

    const role: ResponseCreateRoleDto = {
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

async createRole(dto: CreateRoleDto): Promise<ApiResponse<ResponseCreateRoleDto>> {
const MERIDA_OFFSET_MS = -6 * 60 * 60 * 1000;

const now = new Date();
const localDate = new Date(now.getTime() + MERIDA_OFFSET_MS);

  const createRole = await this.prisma.rol.create({
    data: {
      tipo: dto.tipo,
      usuarioAlta: dto.usuarioAlta,
      fechaDeCreacion: localDate,
    },
  });

  const res: ResponseCreateRoleDto = {
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

  async updateRole(id: number, dto: UpdateRoleDto): Promise<ApiResponse<ResponseUpdateRoleDto[]>> {
    try {
          const role = await this.prisma.rol.findUnique({
      where: { rolId: id},
    });

    if (!role) {
      return {
        status: 404,
        message: 'El rol no existe',
        data: [],
      };
    }
const MERIDA_OFFSET_MS = -6 * 60 * 60 * 1000;

const now = new Date();
const localDate = new Date(now.getTime() + MERIDA_OFFSET_MS);



      const roleUpdated = await this.prisma.rol.update({
        where: { rolId: id },
        data: { tipo: dto.tipo, usuarioMod: dto.usuarioMod, fechaMod: localDate},
      });


      const res: ResponseUpdateRoleDto = {
    rolId: roleUpdated.rolId,
    tipo: roleUpdated.tipo,
    usuarioMod: roleUpdated.usuarioMod!,
    fechaMod: roleUpdated.fechaMod!,
    estatus: roleUpdated.estatus!,
  };
      return {
        status: 200,
        message: 'Rol actualizado correctamente',
        data: [res],
      };
    } catch (err) {
      throw err;
    }
  }


  async deleteRole(id: number, dto: DeleteRoleDto): Promise<ApiResponse<ResponseDeleteRoleDto[]>> {
    try {

       const roleRaw = await this.prisma.rol.findUnique({
      where: { rolId: id },
    });

    if (!roleRaw) {
      throw new NotFoundException('No se encontraron el rol');
    }
      const MERIDA_OFFSET_MS = -6 * 60 * 60 * 1000;

const now = new Date();
const localDate = new Date(now.getTime() + MERIDA_OFFSET_MS);
      const roleDeleted = await this.prisma.rol.update({ where: { rolId: id }, data: { estatus: 'BA', usuarioBaja: dto.usuarioBaja, fechaBaja: localDate } });
      const res: ResponseDeleteRoleDto = {
    rolId: roleDeleted.rolId,
    tipo: roleDeleted.tipo,
    usuarioBaja: roleDeleted.usuarioBaja!,
    fechaBaja: roleDeleted.fechaBaja!,
    estatus: roleDeleted.estatus!,
  };
    
      return {
        status: 200,
        message: 'Rol eliminado correctamente',
        data: [res],
      };
    } catch (err) {
      throw err;
    }

  }



}