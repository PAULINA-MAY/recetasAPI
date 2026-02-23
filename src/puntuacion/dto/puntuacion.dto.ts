import {  ApiProperty } from "@nestjs/swagger";
import { IsDecimal, IsNotEmpty, Min } from "class-validator";

export class PuntuacionDto {
    @ApiProperty({ example: 1 })
    puntuacionId: number;
    RecetaIngredienteFKId: number;
    IdUsuarioFK: number;
    @ApiProperty({ example: 4.5 })
    @IsDecimal(
        { force_decimal: true, decimal_digits: '2' },
        { message: '¡El precio debe ser un número válido!' },
    )
    @IsNotEmpty({ message: 'El precio es requerido' })
    @Min(0, { message: 'El precio debe ser mayor o igual a 0' })
    puntuacion: number;
    fechaCreacion: Date;
}