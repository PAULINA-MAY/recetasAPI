import { ApiProperty, OmitType } from '@nestjs/swagger';
import { UsuariosDto } from './usuarios.dto';

export class CreateUsuariosDto extends OmitType(UsuariosDto, ['usuarioId', 'fechaDeCreacion', 'rolIdFK', 'fechaMod', 'usuarioMod', 'fechaBaja', 'usuarioBaja', 'estatusAC', 'estatusBA', 'estatus'] as const) {

}


export class ResponseCreateUsuarioDto extends OmitType(UsuariosDto, ['fechaMod','fechaBaja','usuarioMod','usuarioBaja', 'estatusBA', 'contrase_a', 'estatusAC'] as const) {



}


