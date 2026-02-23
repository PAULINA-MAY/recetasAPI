import { OmitType } from "@nestjs/swagger";
import { PuntuacionDto } from "./puntuacion.dto";

export class CreatePuntuacionDto extends OmitType(PuntuacionDto, ['puntuacionId', 'fechaCreacion'] as const) {


}