import { ApiProperty, OmitType } from "@nestjs/swagger";
import { PuntuacionDto } from "./puntuacion.dto";

export class UpdatePuntuacionDto extends OmitType(PuntuacionDto, ['puntuacionId', 'fechaCreacion'] as const) {

}