import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateChatGatewayDto } from "src/chatGateway/dto/create-chatGateway_dto";
import { ApiResponse } from "src/global/response/response";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class ComentarioService {
    constructor(private readonly prisma: PrismaService) { }
async getAllComentarios(): Promise<ApiResponse<any>> {
  try {
    const comentarios = await this.prisma.comentario.findMany();

    if (comentarios.length === 0) {
      return {
        status: 404,
        message: 'No se encontraron comentarios',
        data: [],
      };
    }

    return {
      status: 200,
      message: 'Comentarios obtenidos correctamente',
      data: comentarios,
    };
  } catch (err) {
    throw err;
  }
}

    async getComentariosByReceta(
        recetaId: number
    ): Promise<ApiResponse<any>> {

        const comentarios = await this.prisma.comentario.findMany({
            where: {
                RecetaIngredienteIdFK: recetaId,
            },
            orderBy: {
                comentarioId: 'desc', // opcional
            },
        });

        return {
            status: 200,
            message: 'Comentarios obtenidos correctamente',
            data: comentarios,
        };
    }

    async createComentario(
        idReceta: number,
        idUsuario: number,
        dto: CreateChatGatewayDto
    ): Promise<ApiResponse<any>> {

        const comentario = await this.prisma.comentario.create({
            data: {
                FKUsuarioId: idUsuario,
                RecetaIngredienteIdFK: idReceta,
                comentario: dto.comentario,
            },
        });

        return {
            status: 201,
            message: 'Comentario creado correctamente',
            data: comentario,
        };
    }

    async deleteComentario(comentarioId: number): Promise<ApiResponse<any>> {
    const comentarioExistente = await this.prisma.comentario.findUnique({
      where: { comentarioId },
    });

    if (!comentarioExistente) {
      throw new NotFoundException('Comentario no encontrado');
    }

    await this.prisma.comentario.delete({
      where: { comentarioId },
    });

    return {
      status: 200,
      message: 'Comentario eliminado correctamente',
      data: null,
    };
  }


      async updateComentario(
    comentarioId: number,
    nuevoTexto: string
  ): Promise<ApiResponse<any>> {
    const comentarioExistente = await this.prisma.comentario.findUnique({
      where: { comentarioId },
    });

    if (!comentarioExistente) {
      throw new NotFoundException('Comentario no encontrado');
    }

    const comentarioActualizado = await this.prisma.comentario.update({
      where: { comentarioId },
      data: { comentario: nuevoTexto },
    });

    return {
      status: 200,
      message: 'Comentario actualizado correctamente',
      data: comentarioActualizado,
    };
  }

}