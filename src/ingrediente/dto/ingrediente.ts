import { ApiOperation, ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsDecimal, IsNotEmpty } from "class-validator";

export class IngredienteDto {
    @ApiProperty({ example: 'Azúcar' })
    nombre: string;
        @ApiProperty({ example: '100.00' })
    @IsNotEmpty()
    @IsDecimal({ decimal_digits: '2' })
    @IsNotEmpty()
    cantidad: number;
        @ApiProperty({ example: 'gramos' })
    @IsNotEmpty()
    unidad_medida: string;
        @ApiProperty({ example: '2024-01-01T00:00:00.000Z' })
    @IsDateString()
    fechaDeCreacion?: Date;

}