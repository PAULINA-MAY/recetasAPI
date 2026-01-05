import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsInt, IsNotEmpty, IsPositive, IsString } from "class-validator";

export class CreateRecetaDto {

    @IsString()
    @IsNotEmpty()
    descripcion: string;

    @IsString()
    @IsNotEmpty()
    tiempoPreparacion: string;

    @IsInt()
    @IsPositive()
    porcion: number;

}