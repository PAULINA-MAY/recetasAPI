import { OmitType } from "@nestjs/swagger";
import { PasoDto } from "./paso.dto";

export class UpdatePasoDto extends OmitType(PasoDto, ['estatus'] as const) {}
    
