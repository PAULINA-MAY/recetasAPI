import { ApiProperty, OmitType } from "@nestjs/swagger";
import {  PasoDto } from "./paso.dto";
import { IsArray, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

export class CreatePasoDto extends OmitType(
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
) {
  
}

export class ResponseCreatePasoDto extends OmitType(
  PasoDto,
  [
    'usuarioBaja',
    'fechaBaja',
    'usuarioMod',
    'fechaMod',
  ] as const
) {}

