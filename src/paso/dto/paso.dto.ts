import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class PasoBaseDto {
  @ApiProperty({ example: 1 })
    @IsNotEmpty()
  numeroPaso: number;

  @ApiProperty({ example: 'Agregar una cucharada de azúcar' })
    @IsNotEmpty()
  descripcion: string;

       @ApiProperty({ example: 'estatus', required: false })
       @IsNotEmpty({ message: 'El estatus es requerido' })
  estatus: string;
}

export class PasoDto extends PasoBaseDto {}







