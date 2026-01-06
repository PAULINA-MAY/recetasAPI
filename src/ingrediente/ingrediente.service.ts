import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { createIngredienteDto } from "./dto/createIngrediente_dto";
import { ApiResponse } from "src/global/response/response";
import { IngredienteModel, RecetaModel } from "generated/prisma/models";

@Injectable()
export class IngredienteService {
  constructor(private prisma: PrismaService) { }
  async getAllIngredientes(): Promise<ApiResponse<IngredienteModel[]>> {
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


}