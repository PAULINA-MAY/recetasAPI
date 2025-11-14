import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';

export class CreateRoleDto {
  @ApiProperty({ description: 'Tipo de rol', example: 'admin' })
  @IsString()
  @Length(1, 150)
  tipo: string;
}
