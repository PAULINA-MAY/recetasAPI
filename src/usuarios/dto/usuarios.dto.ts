import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsInt, IsString, Length } from "class-validator";

export class UsuariosDto {
   @ApiProperty({ example: 1 })
  @IsInt()
  usuarioId: number;

 @ApiProperty({ example: 1 })
  @IsInt()
  rolIdFK: number;

  @ApiProperty({ example: 'Juan Pérez' })
  @IsString()
  @Length(1, 150)
  nombreCompleto: string;

  @ApiProperty({ example: 'juan.perez@example.com' })
  @IsEmail()
  correo: string;



   @ApiProperty({ example: '2023-01-01T00:00:00Z' })
  fechaDeCreacion: Date | null;
}