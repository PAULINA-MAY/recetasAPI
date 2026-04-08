import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class RoleDto {
  @ApiProperty({ example: 1 })
  rolId: number;

  @ApiProperty({ example: 'admin' })
   @IsNotEmpty({ message: 'El tipo es requerido' })
  tipo: string;

@ApiProperty({ example: 'SYSTEM', required: false })
 @IsNotEmpty({ message: 'El usuario de alta es requerido' })
  usuarioAlta: string;


  @ApiProperty({ example: '2026-04-08T12:00:00.000Z', required: false })
   @IsNotEmpty({ message: 'La fecha de modificación es requerida' })
  fechaMod: Date;

    @ApiProperty({ example: 'SYSTEM', required: false })
     @IsNotEmpty({ message: 'El usuario de modificación es requerido' })
  usuarioMod: string;

  @ApiProperty({ example: '2026-04-08T15:00:00.000Z', required: false })
   @IsNotEmpty({ message: 'La fecha de baja es requerida' })

  fechaBaja: Date;

    @ApiProperty({ example: 'SYSTEM', required: false })
     @IsNotEmpty({ message: 'El usuario de baja es requerido' })
  usuarioBaja: string;

      @ApiProperty({ example: 'AC', required: false })
       @IsNotEmpty({ message: 'El estatus es requerido' })
  estatus: string;
  

}


export class RequestCreateRoleDto {
  @ApiProperty({ example: 1 })
  rolId: number;

  @ApiProperty({ example: 'admin' })
  tipo: string;

@ApiProperty({ example: 'SYSTEM', required: false })
  usuarioAlta: string;

    @ApiProperty({ example: '2026-04-08T15:00:00.000Z', required: false })
  fechaCreacion: Date;

    @ApiProperty({ example: 'AC', required: false })
  estatus: string;


}

