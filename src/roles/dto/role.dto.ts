import { ApiProperty } from '@nestjs/swagger';

export class RoleDto {
  @ApiProperty({ example: 1 })
  rolId: number;

  @ApiProperty({ example: 'admin' })
  tipo: string;
}
