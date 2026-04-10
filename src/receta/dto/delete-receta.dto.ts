import { OmitType } from "@nestjs/swagger";
import { RecetaDto } from "./receta";

export class DeleteRecetaDto extends OmitType(RecetaDto, ['recetaId','usuarioId','fechaMod','fechaBaja','usuarioMod','usuarioAlta', 'fechaDeCreacion','estatus'] as const) {


}

export class ResponseDeleteRecetaDto extends OmitType(RecetaDto, ['fechaMod','usuarioMod','usuarioAlta', 'fechaDeCreacion'] as const) {}