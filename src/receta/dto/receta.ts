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
        example: 'Receta tradicional de pasta',
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
    @IsDateString()
    fechaDeCreacion?: Date;
}