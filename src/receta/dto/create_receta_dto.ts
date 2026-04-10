import {  OmitType } from "@nestjs/swagger";
import { RecetaDto } from "./receta";

export class CreateRecetaDto extends OmitType(RecetaDto, ['fechaDeCreacion','usuarioId', 'fechaMod', 'usuarioMod', 'fechaBaja', 'usuarioBaja', 'estatus', 'recetaId'] as const) {
}

export class ResponseCreateRecetaDto extends OmitType(RecetaDto, ['fechaMod','fechaBaja','usuarioMod','usuarioBaja'] as const) {



}