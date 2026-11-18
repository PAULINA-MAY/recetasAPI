import { OmitType, PickType } from "@nestjs/swagger";
import { PuntuacionDto } from "./puntuacion.dto";

export class CreatePuntuacionDto extends OmitType(PuntuacionDto, ['puntuacionId', 'fechaCreacion', 'usuarioAlta', 'fechaBaja', 'usuarioBaja', 'usuarioMod', 'fechaMod', 'estatus','RecetaIngredienteFKId', 'IdUsuarioFK' ] as const) {


}


export class ResponseCreatePuntuacionDto extends OmitType(
    PuntuacionDto,
    [
   

        'fechaMod',
        'usuarioMod',
        'usuarioBaja',
        'fechaBaja'

    ] as const
) {}