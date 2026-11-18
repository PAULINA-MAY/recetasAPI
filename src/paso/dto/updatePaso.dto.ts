import { OmitType } from "@nestjs/swagger";
import { PasoDto } from "./paso.dto";

export class UpdatePasoDto extends OmitType(
  PasoDto,
  [
    'pasoId',
    'usuarioAlta',
    'usuarioBaja',
    'fechaBaja',
    'usuarioMod',
    'fechaMod',
    'estatus'
  ] as const
) {}
    
