import { ApiProperty, OmitType } from '@nestjs/swagger';
import { IsEmail, IsInt, IsString, Length } from 'class-validator';
import { UsuariosDto } from './usuarios.dto';

export class CreateUsuariosDto extends OmitType(UsuariosDto, ['usuarioId', 'fechaDeCreacion', 'rolIdFK'] as const) {
  @ApiProperty({ example: 'MiPassword123' })
  @IsString()
@Length(1, 8)
  contrase_a: string;
  
}


