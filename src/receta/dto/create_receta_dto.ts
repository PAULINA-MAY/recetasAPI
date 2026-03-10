import { ApiProperty, OmitType } from "@nestjs/swagger";
import { IsDateString, IsInt, IsNotEmpty, IsPositive, IsString } from "class-validator";
import { RecetaDto } from "./receta";

export class CreateRecetaDto extends OmitType(RecetaDto, ['fechaDeCreacion','usuarioId'] as const) {


}