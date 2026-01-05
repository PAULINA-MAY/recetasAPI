import { Injectable, NotFoundException } from "@nestjs/common";
import { ApiResponse } from "src/global/response/response";
import { PrismaService } from "src/prisma/prisma.service";
import { RecetaModel } from "generated/prisma/models";
import { CreateRecetaDto } from "./dto/create_receta_dto";
import { UpdateRecetaDto } from "./dto/update_receta_dto";

@Injectable()
export class RecetaService {
  constructor(private prisma: PrismaService) { }
  async getAllRecetas(): Promise<ApiResponse<RecetaModel[]>> {
    try {
      const recetas = await this.prisma.receta.findMany();
      console.log("Recetas:", recetas);
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
  async getRecetasByiD(id: number): Promise<ApiResponse<RecetaModel[]>> {
    try {
      const recetas = await this.prisma.receta.findUnique({
        where: {
          recetaId: id
        }
      });
      if (!recetas || recetas === null || recetas === undefined) {
        throw new NotFoundException('No se encontró la receta');
      }else{
         return {
        status: 200,
        message: 'Recetas obtenidas correctamente',
        data: recetas ? [recetas] : [],
      };
      }
     

    } catch (err) {
      throw err;
    }
  }

  async createReceta(id: number, dto: CreateRecetaDto): Promise<ApiResponse<RecetaModel[]>> {
    try {
      const recetaCreated = await this.prisma.receta.create({ data: { usuarioIdFK: id, descripcion: dto.descripcion, tiempoPreparacion: dto.tiempoPreparacion, porcion: dto.porcion } });
      return {
        status: 201,
        message: 'Receta creada correctamente',
        data: [recetaCreated],
      };
    } catch (err) {
      throw err;
    }
  }

  async updateReceta(id: number, dto: UpdateRecetaDto): Promise<ApiResponse<RecetaModel[]>> {
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

  async deleteReceta(id: number): Promise<ApiResponse<RecetaModel[]>> {
    try {
      const recetaDeleted = await this.prisma.receta.delete({ where: { recetaId: id } });
      return {
        status: 200,
        message: 'Receta eliminada correctamente',
        data: [recetaDeleted],
      };
    } catch (err) {
      throw err;
    }
  }

}