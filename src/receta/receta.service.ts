import { Injectable, NotFoundException } from "@nestjs/common";
import { ApiResponse } from "src/global/response/response";
import { PrismaService } from "src/prisma/prisma.service";

import { CreateRecetaDto } from "./dto/create_receta_dto";
import { UpdateRecetaDto } from "./dto/update_receta_dto";

@Injectable()
export class RecetaService {
  constructor(private prisma: PrismaService) { }
  async getAllRecetas(): Promise<ApiResponse<any>> {
    try {
      const recetas = await this.prisma.receta.findMany();
      if (!recetas || recetas.length === 0) {
        throw new NotFoundException('No se encontraron roles');
      } else {
        return {
          status: 200,
          message: 'Recetas obtenidas correctamente',
          data: recetas,
        };
      }

    } catch (err) {
      throw err;
    }
  }
async getRecetasByiD(id: number): Promise<ApiResponse<any>> {
  try {
    const receta = await this.prisma.receta.findUnique({
      where: { recetaId: id },
      include: {
        recetaIngredientes: {
          include: {
            ingrediente: true,
            Paso: {
              select: {
                PasoId: true,
                numeroPaso: true,
                descripcion: true,
              },
            },
          },
        },
      },
    });

    if (!receta) {
      throw new NotFoundException('No se encontró la receta');
    }

    //EXTRAER DATOS
    const ingredientes = receta.recetaIngredientes.map(ri => ri.ingrediente);

    const pasos = receta.recetaIngredientes.flatMap(ri => ri.Paso);

    //RESPUESTA 
    const resultado = {
      recetaId: receta.recetaId,
      usuarioIdFK: receta.usuarioIdFK,
      titulo: receta.titulo,
      descripcion: receta.descripcion,
      tiempoPreparacion: receta.tiempoPreparacion,
      porcion: receta.porcion,
      fechaDeCreacion: receta.fechaDeCreacion,
      ingredientes,
      pasos
    };

    return {
      status: 200,
      message: 'Receta obtenida correctamente',
      data: [resultado],
    };
  } catch (err) {
    throw err;
  }
}

 async createReceta(
  idUser: number,
  dto: CreateRecetaDto,
): Promise<ApiResponse<any>> {
  try {

    const userExists = await this.prisma.usuario.findUnique({
      where: { usuarioId: idUser },
    });
    if (!userExists) {
      throw new NotFoundException('Usuario no encontrado');
    }
    const recetaCreated = await this.prisma.receta.create({
      data: {
        usuarioIdFK: idUser,
        descripcion: dto.descripcion,
        tiempoPreparacion: dto.tiempoPreparacion,
        porcion: dto.porcion,
        titulo: dto.titulo
      },
    });

    return {
      status: 201,
      message: 'Receta creada correctamente',
      data: [recetaCreated],
    };
  } catch (err) {
    throw err;
  }
}

async updateReceta(
  id: number,
  dto: UpdateRecetaDto,
): Promise<ApiResponse<any>> {
  try {
    const recetaUpdated = await this.prisma.receta.update({
      where: { recetaId: id },
      data: { ...dto },
    });

    return {
      status: 200,
      message: 'Receta actualizada correctamente',
      data: [recetaUpdated],
    };
  } catch (err) {
    throw err;
  }
}

async deleteReceta(id: number): Promise<ApiResponse<any>> {
  try {
    const recetaDeleted = await this.prisma.receta.delete({
      where: { recetaId: id },
    });

    return {
      status: 200,
      message: 'Receta eliminada correctamente',
      data: recetaDeleted,
    };
  } catch (err) {
    throw err;
  }
}

}