import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsNotEmpty,  IsNumber, IsOptional,  IsString } from "class-validator";

export class PasoDto {

    @ApiProperty({ example: 1 })
  @IsNotEmpty()
  @IsNumber()
  pasoId: number;
  @ApiProperty({ example: 1 })
    @IsNotEmpty()
  numeroPaso: number;

  @ApiProperty({ example: 'Agregar una cucharada de azúcar' })
    @IsNotEmpty()
  descripcion: string;


    @ApiProperty({ example: 'ADMIN', required: false })
  @IsOptional()
  @IsString()
  usuarioAlta?: string;

  @ApiProperty({ example: 'ADMIN', required: false })
  @IsOptional()
  @IsString()
  usuarioBaja?: string;

  @ApiProperty({ example: '2026-11-17T00:00:00.000Z', required: false })
  @IsOptional()
  @IsDateString()
  fechaBaja?: Date;

  @ApiProperty({ example: 'ADMIN', required: false })
  @IsOptional()
  @IsString()
  usuarioMod?: string;

  @ApiProperty({ example: '2026-11-17T00:00:00.000Z', required: false })
  @IsOptional()
  @IsDateString()
  fechaMod?: Date;

       @ApiProperty({ example: 'estatus', required: false })
       @IsNotEmpty({ message: 'El estatus es requerido' })
  estatus: string;
}









