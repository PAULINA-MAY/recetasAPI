import { ApiProperty } from "@nestjs/swagger";
import { IsString, Length } from "class-validator";

export class LoginDto{
        @ApiProperty({ description: 'Nombre Completo', example: 'Paulina May' })
        @IsString()
        nombreCompleto:string;
        @ApiProperty({ description: 'Contraseña', example: 'Example123' })
        @IsString()
        @Length(1, 8)
         contrase_a:string;

}