import { PartialType } from "@nestjs/mapped-types";
import { CreateRecetaDto } from "./create_receta_dto";

export class UpdateRecetaDto extends PartialType(CreateRecetaDto) {}