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
}