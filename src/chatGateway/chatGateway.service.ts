import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateChatGatewayDto } from "./dto/create-chatGateway_dto";

@Injectable()
export class ChatGatewayService {
    constructor(private readonly prisma:PrismaService) {}
    async createComentario(dto: CreateChatGatewayDto) {
          try {
            const comentarioCreatdo = await this.prisma.comentario.create({
                data:{
                 comentario: dto.comentario ? dto.comentario : 'Sin comentario',
                FKUsuarioId: dto.FKUsuarioId ?? 0, 
                RecetaIngredienteIdFK: dto.RecetaIngredienteIdFK ?? 0,
                }
            });
            return comentarioCreatdo;

          } catch (err) {
            throw err;
          }
    }

    async deleteComentario(idComentario: number) {
      try {
        const comentarioEliminado = await this.prisma.comentario.delete({
          where: {
            comentarioId: idComentario,
          },
        });
        return comentarioEliminado;
      } catch (err) {
        throw err;
      }
    }

    async updateComentario(idComentario: number, comentario: string) {
      try {
        const comentarioActualizado = await this.prisma.comentario.update({
          where: {
            comentarioId: idComentario,
          },
          data: {
            comentario: comentario,
          },
        });
        return comentarioActualizado;
      } catch (err) {
        throw err;
      }
    }
}