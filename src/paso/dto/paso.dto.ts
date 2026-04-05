import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class PasoBaseDto {
  @ApiProperty({ example: 1 })
    @IsNotEmpty()
  numeroPaso: number;

  @ApiProperty({ example: 'Agregar una cucharada de azúcar' })
    @IsNotEmpty()
  descripcion: string;
}

export class PasoDto extends PasoBaseDto {}







