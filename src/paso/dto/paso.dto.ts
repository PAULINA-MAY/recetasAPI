import { ApiProperty } from "@nestjs/swagger";

export class PasoBaseDto {
  @ApiProperty({ example: 1 })
  numeroPaso: number;

  @ApiProperty({ example: 'Agregar una cucharada de azúcar' })
  descripcion: string;
}

export class PasoDto extends PasoBaseDto {}







