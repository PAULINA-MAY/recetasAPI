import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

import { ApiResponse } from "src/global/response/response";

import { ResponseUpdateIngredienteDto, UpdateIngredienteDto } from "./dto/updateIngrediente_dto";
import { CreateIngredienteDto } from "./dto/createIngrediente_dto";


@Injectable()
export class IngredienteService {
  constructor(private prisma: PrismaService) { }
  async getAllIngredientes(): Promise<ApiResponse<any>> {
    try {
      const ingredientes = await this.prisma.ingrediente.findMany();

      if (!ingredientes || ingredientes.length === 0) {
        throw new NotFoundException('No se encontraron ingredientes');
      } else {
        return {
          status: 200,
          message: 'Ingredientes obtenidos correctamente',
          data: ingredientes,
        };
      }

    } catch (err) {
      throw err;
    }
  }

  async getIngredientesAc(): Promise<ApiResponse<any[]>> {
    try {
        const ingredientes = await this.prisma.ingrediente.findMany({
            where: { estatus: 'AC' },
            select: {
                ingredienteId: true,
                nombre: true,
                cantidad: true,
                unidad_medida: true,
                fechaDeCreacion: true,
                usuarioAlta: true,
                usuarioMod: true,
                fechaMod: true,
                estatus: true,
            },
        });

        if (!ingredientes || ingredientes.length === 0) {
            return {
                status: 404,
                message: 'No se encontraron ingredientes activos',
                data: [],
            };
        }

        return {
            status: 200,
            message: 'Ingredientes activos obtenidos correctamente',
            data: ingredientes,
        };

    } catch (err) {
        throw err;
    }
}

    async getIngredientesBa(): Promise<ApiResponse<any[]>> {
    try {
        const ingredientes = await this.prisma.ingrediente.findMany({
            where: { estatus: 'BA' },
            select: {
                ingredienteId: true,
                nombre: true,
                cantidad: true,
                unidad_medida: true,
                fechaDeCreacion: true,
                usuarioAlta: true,
                usuarioBaja: true,
                fechaBaja: true,
                usuarioMod: true,
                fechaMod: true,
                estatus: true,
            },
        });

        if (!ingredientes || ingredientes.length === 0) {
            return {
                status: 404,
                message: 'No se encontraron ingredientes dados de baja',
                data: [],
            };
        }

        return {
            status: 200,
            message: 'Ingredientes dados de baja obtenidos correctamente',
            data: ingredientes,
        };

    } catch (err) {
        throw err;
    }
}

  async getIngredienteById(ingredienteId: number): Promise<ApiResponse<any>> {
    try {
      const ingrediente = await this.prisma.ingrediente.findUnique({
        where: { ingredienteId },
      });

      if (!ingrediente) {
        throw new NotFoundException('Ingrediente no encontrado');
      } else {
        return {
          status: 200,
          message: 'Ingrediente obtenido correctamente',
          data: [ingrediente],
        };
      }
    } catch (err) {
      throw err;
    }
  }

  async createIngrediente(
    dto: CreateIngredienteDto,
    recetaId: number,
  ): Promise<ApiResponse<any>> {
    try {
      const ingrediente = await this.prisma.$transaction(async (tx) => {

        //  Validar receta
        const receta = await tx.receta.findUnique({
          where: { recetaId },
        });

        if (!receta) {
          throw new NotFoundException('La receta no existe');
        }
           console.log('dto:', dto); 
        //  Crear ingrediente
        const ingredienteCreado = await tx.ingrediente.create({
          data: {
            nombre: dto.nombre,
            cantidad: dto.cantidad,
            unidad_medida: dto.unidad_medida,
          },
        });

        // Crear relación
        await tx.recetaIngrediente.create({
          data: {
            idRecetaFK: receta.recetaId,
            idIngredienteFK: ingredienteCreado.ingredienteId,
          },
        });

        return ingredienteCreado;
      });

      return {
        status: 201,
        message: 'Ingrediente agregado correctamente a la receta',
        data: [ingrediente],
      };
    } catch (err) {
      throw err;
    }
  }



  async updateIngrediente(id: number, dto: UpdateIngredienteDto): Promise<ApiResponse<any>> {
    try {
      const updatedIngrediente = await this.prisma.ingrediente.update({
        where: { ingredienteId: id },
        data: { ...dto },
      });
      return {
        status: 200,
        message: 'Ingrediente actualizado correctamente',
        data: [updatedIngrediente],
      }
    } catch (err) {
      throw err;
    }
  }

async deleteIngrediente(id: number, usuarioMod: string): Promise<ApiResponse< ResponseUpdateIngredienteDto[]>> {
    try {
      const ingrediente = await this.prisma.ingrediente.findUnique({
        where: { ingredienteId: id },
      });

      if(!ingrediente) {
        throw new NotFoundException('Ingrediente no encontrado');
      }
       if(ingrediente.estatus === 'BA') {
        throw new BadRequestException('El ingrediente ya está dado de baja');
      }

       const MERIDA_OFFSET_MS = -6 * 60 * 60 * 1000;
    const now = new Date();
    const localDate = new Date(now.getTime() + MERIDA_OFFSET_MS);

      const deletedIngrediente = await this.prisma.ingrediente.update({
        where: { ingredienteId: id },
        data: { estatus: 'BA', usuarioMod: usuarioMod, fechaMod: localDate   },
      });

      const res: ResponseUpdateIngredienteDto = {
        ingredienteId: id,
        nombre: deletedIngrediente.nombre,  
        cantidad: Number(deletedIngrediente.cantidad),
       unidad_medida: deletedIngrediente.unidad_medida!,
        fechaDeCreacion: localDate,
        fechaMod: localDate,
        usuarioMod: usuarioMod,
        estatus: deletedIngrediente.estatus!,
      };

      return {
        status: 200,
        message: 'Ingrediente dado de baja correctamente',
        data: [res],
      }

    } catch (err) {
      throw err;

    }

    }

    async activarIngrediente(id: number, usuarioMod: string): Promise<ApiResponse< ResponseUpdateIngredienteDto[]>> {
    try {
      const ingrediente = await this.prisma.ingrediente.findUnique({
        where: { ingredienteId: id },
      });

      if(!ingrediente) {
        throw new NotFoundException('Ingrediente no encontrado');
      }
       if(ingrediente.estatus === 'BA') {
        throw new BadRequestException('El ingrediente ya está dado de baja');
      }

       const MERIDA_OFFSET_MS = -6 * 60 * 60 * 1000;
    const now = new Date();
    const localDate = new Date(now.getTime() + MERIDA_OFFSET_MS);

      const deletedIngrediente = await this.prisma.ingrediente.update({
        where: { ingredienteId: id },
        data: { estatus: 'AC', usuarioMod: usuarioMod, fechaMod: localDate   },
      });

      const res: ResponseUpdateIngredienteDto = {
        ingredienteId: id,
        nombre: deletedIngrediente.nombre,  
        cantidad: Number(deletedIngrediente.cantidad),
       unidad_medida: deletedIngrediente.unidad_medida!,
        fechaDeCreacion: localDate,
        fechaMod: localDate,
        usuarioMod: usuarioMod,
        estatus: deletedIngrediente.estatus!,
      };
      
      return {
        status: 200,
        message: 'Ingrediente activado correctamente',
        data: [res],
      }

    } catch (err) {
      throw err;

    }

    }

}