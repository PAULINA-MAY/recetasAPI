import { ApiProperty, OmitType } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';
import { RoleDto } from './role.dto';

export class CreateRoleDto extends OmitType(RoleDto, ['rolId','fechaMod','fechaBaja','usuarioMod','usuarioBaja', 'estatus'] as const) {

}


