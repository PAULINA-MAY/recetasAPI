import { OmitType, PartialType } from "@nestjs/swagger";
import { ComentarioDto } from "./chatGateway_dto";

export class CreateChatGatewayDto extends OmitType(
  ComentarioDto,
  ['comentarioId', 'FKUsuarioId', 'RecetaIngredienteIdFK'] as const
) {}