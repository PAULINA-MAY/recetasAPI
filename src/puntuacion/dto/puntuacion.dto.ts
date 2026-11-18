import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsDate, IsDecimal, IsNotEmpty, IsNumber, IsOptional, IsString, Min } from "class-validator";

export class PuntuacionDto {
    @ApiProperty({ example: 1 })
    puntuacionId: number;

    @ApiProperty({ example: 10 })
    RecetaIngredienteFKId: number;

    @ApiProperty({ example: 5 })
    IdUsuarioFK: number;
    @ApiProperty({ example: 4.5 })
    @IsNumber({}, { message: 'La puntuación debe ser un número válido' })
    @IsNotEmpty({ message: 'La puntuación es requerida' })
    @Min(0, { message: 'La puntuación debe ser mayor o igual a 0' })
    puntuacion: number;
    @ApiProperty({ example: '2026-11-18T10:00:00.000Z' })
    @IsDate()
    fechaCreacion: Date;

    @ApiPropertyOptional({ example: 'admin' })
    @IsOptional()
    @IsString()
    usuarioAlta: string;

    @ApiPropertyOptional({ example: '2026-11-18T10:00:00.000Z' })
    @IsOptional()
    @IsDate()
    fechaBaja: Date;

        @ApiPropertyOptional({ example: 'admin' })
    @IsOptional()
    @IsString()
    usuarioBaja: string;

    @ApiPropertyOptional({ example: 'admin' })
    @IsOptional()
    @IsString()
    usuarioMod: string;

    @ApiPropertyOptional({ example: '2026-11-18T10:00:00.000Z' })
    @IsOptional()
    @IsDate()
    fechaMod: Date;

    @ApiPropertyOptional({ example: 'estatus' })
    @IsOptional()
    @IsString()
    estatus: string;
}