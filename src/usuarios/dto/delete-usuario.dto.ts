import { OmitType } from "@nestjs/swagger";
import { UsuariosDto } from "./usuarios.dto";

export class DeleteUsuarioDto extends OmitType(UsuariosDto, ['usuarioId','fechaDeCreacion','fechaMod','usuarioAlta', 'estatusBA', 'usuarioMod', 'estatusAC', 'rolIdFK','estatus'] as const) {


}

export class ResponseDeleteUsuarioDto extends OmitType(UsuariosDto, ['fechaDeCreacion','fechaMod','usuarioAlta',  'estatusAC', 'estatusBA', 'contrase_a', 'usuarioMod'] as const) {}