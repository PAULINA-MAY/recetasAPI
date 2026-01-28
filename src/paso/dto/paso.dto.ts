import { ApiProperty } from "@nestjs/swagger";

export class PasoDto{
  @ApiProperty({ example: 1 })
  pasoId: number;
    @ApiProperty({ example: 1 })
  recetaIngredienteIdFK: number;

    @ApiProperty({ example: 1 })
  numeroPaso: number;
        @ApiProperty({ example: 'Agregar una cucharada de azucar' })
    descripcionPaso: string;

      }