import { IsDateString, IsDecimal, IsNotEmpty, Min } from "class-validator";

export class IngredienteDto {
    ingredienteId: number;
    nombre: string;
    @IsDecimal({ decimal_digits: '2' })
    cantidad: number;
    unidad_medida: string;
    @IsDateString()
    fechaDeCreacion?: Date;

}