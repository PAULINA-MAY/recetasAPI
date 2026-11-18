import { ApiProperty } from "@nestjs/swagger";
import {
    IsDateString,
    IsInt,
    IsNotEmpty,
    IsOptional,
    IsString,
} from "class-validator";

export class IngredienteDto {

    @ApiProperty({ example: 1 })
    @IsNotEmpty()
    @IsInt()
    ingredienteId: number;

    @ApiProperty({ example: 'Azúcar' })
    @IsNotEmpty()
    @IsString()
    nombre: string;

    @ApiProperty({ example: 100 })
    @IsNotEmpty()
    @IsInt()
    cantidad: number;

    @ApiProperty({ example: 'gramos' })
    @IsNotEmpty()
    @IsString()
    unidad_medida: string;

    @ApiProperty({ example: '2024-01-01T00:00:00.000Z' })
    @IsOptional()
    @IsDateString()
    fechaDeCreacion: Date;

    // Auditoría
    @ApiProperty({ example: 'ADMIN', required: false })
    @IsOptional()
    @IsString()
    usuarioAlta: string;

    @ApiProperty({ example: 'ADMIN', required: false })
    @IsOptional()
    @IsString()
    usuarioBaja: string;

    @ApiProperty({ example: '2024-01-01T00:00:00.000Z', required: false })
    @IsOptional()
    @IsDateString()
    fechaBaja: Date;

    @ApiProperty({ example: 'ADMIN', required: false })
    @IsOptional()
    @IsString()
    usuarioMod: string;

    @ApiProperty({ example: '2024-01-01T00:00:00.000Z', required: false })
    @IsOptional()
    @IsDateString()
    fechaMod: Date;

    @ApiProperty({ example: 'estatus' })
    @IsOptional()
    @IsString()
    estatus: string;
}