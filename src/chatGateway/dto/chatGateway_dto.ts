import { ApiProperty } from "@nestjs/swagger";
import { IsEmpty, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class ChatGatewayDto {
        @ApiProperty({ example: 'id' })
    @IsString()
 @IsNotEmpty()
    comentarioId: string;
    @ApiProperty({ example: 1 })
    @IsNumber()
 @IsNotEmpty()
    FKUsuarioId: number;
    @ApiProperty({ example: 1 })    
    @IsNumber()
 @IsNotEmpty()
    RecetaIngredienteIdFK: number;
    @ApiProperty({ example: 'Comentario de ejemplo' })
    @IsString()
 @IsNotEmpty()
    comentario: string;

}