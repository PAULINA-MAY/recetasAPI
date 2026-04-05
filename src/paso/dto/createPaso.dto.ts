import { ApiProperty } from "@nestjs/swagger";
import { PasoDto } from "./paso.dto";
import { IsArray, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

export class CreatePasoDto {
  @ApiProperty({ type: [PasoDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PasoDto)
  pasos: PasoDto[];
}