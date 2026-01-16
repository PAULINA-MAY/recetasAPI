import { IsDateString, IsDecimal, IsNotEmpty } from "class-validator";

export class IngredienteDto {
    nombre: string;
    @IsNotEmpty()
    @IsDecimal({ decimal_digits: '2' })
    @IsNotEmpty()
    cantidad: number;
    @IsNotEmpty()
    unidad_medida: string;
    @IsDateString()
    fechaDeCreacion?: Date;

}