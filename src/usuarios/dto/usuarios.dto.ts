import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsInt, IsNotEmpty, IsString, Length, Matches } from "class-validator";

export class UsuariosDto {
   @ApiProperty({ example: 1 })
     @IsNotEmpty({ message: 'El usuario de modificación es requerido' })
  @IsInt()
  usuarioId: number;

 @ApiProperty({ example: 1 })
   @IsNotEmpty({ message: 'El usuario de modificación es requerido' })
  @IsInt()
  rolIdFK: number;

  @ApiProperty({ example: 'Juan Pérez' })
  @IsString()
  @Length(1, 150)
  nombreCompleto: string;
@ApiProperty({ example: 'PauD3v12' })
@IsString()
@Length(1, 8)
@Matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]+$/, {
  message: 'La contraseña debe contener letras y números',
})
contrase_a: string;
  

  @ApiProperty({ example: 'juan.perez@example.com' })
    @IsNotEmpty({ message: 'El usuario de modificación es requerido' })
  @IsEmail()
  correo: string;

  @ApiProperty({ example: 'SYSTEM', required: false })
 @IsNotEmpty({ message: 'El usuario de alta es requerido' })
  usuarioAlta: string;

   @ApiProperty({ example: '2023-01-01T00:00:00Z' })
     @IsNotEmpty({ message: 'El usuario de modificación es requerido' })
  fechaDeCreacion: Date | null;

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
    estatusAC: string;
    
       @ApiProperty({ example: 'BA', required: false })
         @IsNotEmpty({ message: 'El estatus es requerido' })
    estatusBA: string;
  
         @ApiProperty({ example: 'estatus', required: false })
         @IsNotEmpty({ message: 'El estatus es requerido' })
    estatus: string;
}