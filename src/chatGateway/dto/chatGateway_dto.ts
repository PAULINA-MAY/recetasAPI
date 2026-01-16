import { ApiProperty } from "@nestjs/swagger";
import { IsEmpty, IsNumber, IsString } from "class-validator";

export class ChatGatewayDto {
    @ApiProperty({ example: 1 })
    @IsNumber()
    @IsEmpty()
    FKUsuarioId: number;
    @ApiProperty({ example: 1 })    
    @IsNumber()
    @IsEmpty()
    RecetaIngredienteIdFK: number;
    @ApiProperty({ example: 'Comentario de ejemplo' })
    @IsString()
    @IsEmpty()
    comentario: string;
}