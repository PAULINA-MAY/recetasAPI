import {  ApiProperty } from "@nestjs/swagger";
import { IsDecimal, IsNotEmpty, IsNumber, Min } from "class-validator";

export class PuntuacionDto {
    puntuacionId: number;
    RecetaIngredienteFKId: number;
    IdUsuarioFK: number;
    @ApiProperty({ example: 4.5 })
   @IsNumber({}, { message: 'La puntuación debe ser un número válido' })
    @IsNotEmpty({ message: 'La puntuación es requerida' })
    @Min(0, { message: 'La puntuación debe ser mayor o igual a 0' })
    puntuacion: number;
    fechaCreacion: Date;
}