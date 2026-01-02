import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, isEmail, IsString, Length } from "class-validator";

export class LoginDto{
        @ApiProperty({ description: 'Correo', example: 'paulina@example.com' })
        @IsEmail()
        correo:string;
        @ApiProperty({ description: 'Contraseña', example: 'Example123' })
        @IsString()
        @Length(1, 8)
         contrase_a:string;

}