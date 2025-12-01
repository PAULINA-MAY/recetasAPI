import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsInt, IsString, Length } from 'class-validator';

export class CreateUsuariosDto {
@ApiProperty({ example: 'Paulina May' })
  @IsString()
  @Length(1, 150)
  nombreCompleto: string;

  @ApiProperty({ example: 'paulina.may@example.com' })
  @IsEmail()
  correo: string;

  @ApiProperty({ example: 'MiPassword' })
  @IsString()
  @Length(1, 8)
  contrase_a: string;
}


