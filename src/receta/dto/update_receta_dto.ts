import { PartialType } from "@nestjs/mapped-types";
import { CreateRecetaDto } from "./create_receta_dto";
import { OmitType } from "@nestjs/swagger";
import { RecetaDto } from "./receta";

export class UpdateRecetaDto extends OmitType(RecetaDto, ['recetaId', 'usuarioAlta', 'usuarioId', 'fechaDeCreacion', 'fechaBaja', 'usuarioBaja', 'estatus']) {}

export class ResponseUpdateRecetaDto extends OmitType(RecetaDto, [ 'fechaDeCreacion', 'usuarioAlta',  'fechaBaja', 'usuarioBaja']) {}