import { ApiProperty, OmitType } from "@nestjs/swagger";
import { PuntuacionDto } from "./puntuacion.dto";

export class UpdatePuntuacionDto extends OmitType(PuntuacionDto,  ['puntuacionId', 'fechaCreacion', 'usuarioAlta', 'fechaBaja', 'usuarioBaja', 'usuarioMod', 'fechaMod', 'estatus','RecetaIngredienteFKId', 'IdUsuarioFK' ] as const) {

}


export class ResponseUpdatePuntuacionDto extends OmitType(
    PuntuacionDto,
    [
        'usuarioAlta',
        'fechaCreacion',
        'usuarioBaja',
        'fechaBaja'
    ] as const
) {}