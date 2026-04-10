import { ApiProperty, OmitType } from '@nestjs/swagger';
import { UsuariosDto } from './usuarios.dto';

export class UpdateUsuariosDto extends OmitType(UsuariosDto, ['usuarioId', 'fechaDeCreacion', 'rolIdFK', 'usuarioAlta', 'fechaBaja', 'usuarioBaja', 'estatusAC', 'estatusBA', 'estatus'] as const) {

}


export class ResponseUpdateUsuarioDto extends OmitType(UsuariosDto, ['fechaDeCreacion','fechaBaja','usuarioAlta','usuarioBaja', 'estatusBA', 'contrase_a','estatusAC'] as const) {



}
