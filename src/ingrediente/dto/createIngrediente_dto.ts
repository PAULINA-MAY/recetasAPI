import { OmitType } from "@nestjs/swagger";
import { IngredienteDto } from "./ingrediente";


export class CreateIngredienteDto extends OmitType(
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

export class ResponseCreateIngredienteDto extends OmitType(
    IngredienteDto,
    [
        'usuarioBaja',
        'fechaBaja',
        'usuarioMod',
        'fechaMod'
    ] as const
) {}