import { OmitType, PartialType } from "@nestjs/swagger";
import { IngredienteDto } from "./ingrediente";
import { PasoDto } from "src/paso/dto/paso.dto";

export class UpdateIngredienteDto extends PartialType(OmitType(PasoDto, ['pasoId'] as const)) {
    
}