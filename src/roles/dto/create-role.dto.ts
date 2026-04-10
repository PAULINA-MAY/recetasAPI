import { ApiProperty, OmitType } from '@nestjs/swagger';
import { RoleDto } from './role.dto';

export class CreateRoleDto extends OmitType(RoleDto, ['rolId','fechaMod','fechaBaja','usuarioMod','usuarioBaja','estatusBA', 'fechaCreacion', 'estatusAC', 'estatus'] as const) {

}


export class ResponseCreateRoleDto extends OmitType(RoleDto, ['fechaMod','fechaBaja','usuarioMod','usuarioBaja', 'estatusBA','estatusAC'] as const) {



}