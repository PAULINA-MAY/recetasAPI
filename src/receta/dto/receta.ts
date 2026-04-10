import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsInt, IsNotEmpty, IsPositive, IsString } from "class-validator";

export class RecetaDto {
    @ApiProperty({
        example: 1,
    })
    @IsInt()
    @IsPositive()
    usuarioId: number;
          @ApiProperty({
        example: 'Pasta roja',
    })
    @IsString()
    @IsNotEmpty()
    titulo: string;
    @ApiProperty({
        example: 'Pasta roja con salsa de tomate y albahaca',
    })
    @IsString()
    @IsNotEmpty()
    descripcion: string;

    @ApiProperty({
        example: '01:30:00',
    })
    @IsString()
    @IsNotEmpty()
    tiempoPreparacion: string;

    @ApiProperty({
        example: 4,
    })
    @IsInt()
    @IsPositive()
    porcion: number;

    @ApiProperty({
        example: '2025-01-01T12:00:00Z',
        required: false,
    })

    @ApiProperty({ example: 'SYSTEM', required: false })
 @IsNotEmpty({ message: 'El usuario de alta es requerido' })
  usuarioAlta: string;
    
    @IsDateString()
    fechaDeCreacion?: Date;

    @ApiProperty({ example: '2026-04-08T12:00:00.000Z', required: false })
   @IsNotEmpty({ message: 'La fecha de modificación es requerida' })
  fechaMod: Date;

    @ApiProperty({ example: 'SYSTEM', required: false })
     @IsNotEmpty({ message: 'El usuario de modificación es requerido' })
  usuarioMod: string;

  @ApiProperty({ example: '2026-04-08T15:00:00.000Z', required: false })
   @IsNotEmpty({ message: 'La fecha de baja es requerida' })

  fechaBaja: Date;

    @ApiProperty({ example: 'SYSTEM', required: false })
     @IsNotEmpty({ message: 'El usuario de baja es requerido' })
  usuarioBaja: string;

     @ApiProperty({ example: 'estatus', required: false })
       @IsNotEmpty({ message: 'El estatus es requerido' })
  estatus: string;
}