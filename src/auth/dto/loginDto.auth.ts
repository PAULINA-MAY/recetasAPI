import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class LoginDto{
        @ApiProperty({ description: 'Nombre Completo', example: 'Paulina May' })
        @IsString()
        nombreCompleto:string;
        @ApiProperty({ description: 'Contraseña', example: 'Example123' })
        @IsString()
         contrase_a:string;

}