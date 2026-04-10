import { ApiProperty, OmitType } from "@nestjs/swagger";
import { RoleDto } from "./role.dto";

export class UpdateRoleDto extends OmitType(RoleDto, ['rolId','fechaBaja','usuarioBaja','usuarioAlta', 'estatusBA', 'fechaCreacion','estatusAC', 'fechaMod', 'estatus'] as const) {} 


export class ResponseUpdateRoleDto extends OmitType(RoleDto, ['fechaBaja','usuarioBaja','usuarioAlta', 'fechaCreacion', 'estatusBA', 'estatusAC'] as const) {}

