import { ApiProperty, OmitType } from "@nestjs/swagger";
import { PasoDto } from "./paso.dto";
import { IsArray, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

export class PasoCreateDto extends OmitType(PasoDto, ['estatus'] as const) {}

export class CreatePasoDto {
  @ApiProperty({ type: [PasoCreateDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PasoCreateDto)
  pasos: PasoCreateDto[];
}