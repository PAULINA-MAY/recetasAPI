import { OmitType, PartialType } from "@nestjs/swagger";
import { IngredienteDto } from "./ingrediente";
import { PasoDto } from "src/paso/dto/paso.dto";

export class UpdateIngredienteDto extends OmitType(
    IngredienteDto,
    [
        'ingredienteId',
        'fechaDeCreacion',
        'usuarioAlta',
        'usuarioBaja',
        'fechaBaja',
        'usuarioMod',
        'fechaMod',
        'estatus'
    ] as const
) {}

export class ResponseUpdateIngredienteDto extends OmitType(
    IngredienteDto,
    [
        'usuarioAlta',
        'usuarioBaja',
        'fechaBaja',
    ] as const
) {}