import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { createIngredienteDto } from "./dto/createIngrediente_dto";
import { ApiResponse } from "src/global/response/response";
import { IngredienteModel, RecetaModel } from "generated/prisma/models";
import { UpdateIngredienteDto } from "./dto/updateIngrediente_dto";


@Injectable()
export class IngredienteService {
  constructor(private prisma: PrismaService) { }
  async getAllIngredientes(): Promise<ApiResponse<IngredienteModel[]>> {
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

  async getIngredienteById(ingredienteId: number): Promise<ApiResponse<IngredienteModel[]>> {
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
    dto: createIngredienteDto,
    recetaId: number,
  ): Promise<ApiResponse<IngredienteModel[]>> {
    try {
      const ingrediente = await this.prisma.$transaction(async (tx) => {

        //  Validar receta
        const receta = await tx.receta.findUnique({
          where: { recetaId },
        });

        if (!receta) {
          throw new NotFoundException('La receta no existe');
        }

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

  async updateIngrediente(id: number, dto: UpdateIngredienteDto): Promise<ApiResponse<IngredienteModel[]>> {
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

  async deleteIngrediente(id: number): Promise<ApiResponse<IngredienteModel[]>> {
    try {
      const deletedIngrediente = await this.prisma.ingrediente.delete({
        where: { ingredienteId: id },
      });
      return {
        status: 200,
        message: 'Ingrediente eliminado correctamente',
        data: [deletedIngrediente],
      }

    } catch (err) {
      throw err;
    }
  }

}