import { OmitType } from "@nestjs/swagger";
import { RoleDto } from "./role.dto";

export class DeleteRoleDto extends OmitType(RoleDto, ['rolId','fechaMod','fechaBaja','usuarioMod','usuarioAlta', 'fechaCreacion','estatusBA', 'fechaCreacion', 'estatusAC', 'tipo','estatus'] as const) {


}

export class ResponseDeleteRoleDto extends OmitType(RoleDto, ['fechaMod','usuarioMod','usuarioAlta', 'fechaCreacion', 'estatusAC','estatusBA'] as const) {}