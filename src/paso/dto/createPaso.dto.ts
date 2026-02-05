import { ApiProperty } from "@nestjs/swagger";
import { PasoDto } from "./paso.dto";
export class CreatePasoDto {
  @ApiProperty({
    type: [PasoDto],
  })
  pasos: PasoDto[];
}