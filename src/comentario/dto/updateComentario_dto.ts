import { OmitType, PartialType } from "@nestjs/swagger";
import { ComentarioDto } from "./comentario";

export class UpdateComentarioDto extends PartialType(
  OmitType(ComentarioDto, ['comentarioId', 'fechaDeCreacion'] as const),
) {}