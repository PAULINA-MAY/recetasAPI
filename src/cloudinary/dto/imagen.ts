import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsInt, IsOptional, IsString } from "class-validator";

export class ImagenDto {
  @ApiProperty({ example: 1 })
  @IsInt()
  imagenId: number;

  @ApiProperty({ example: 'https://res.cloudinary.com/demo/image.jpg' })
  @IsString()
  url: string;

  @ApiProperty({ example: 'image' })
  @IsString()
  tipo: string;

  @ApiProperty({ example: '2026-04-08T12:00:00.000Z' })
  @IsDateString()
  fechaDeCreacion: Date;

  @ApiProperty({ example: 'recetas/imagen123', nullable: true })
  @IsOptional()
  @IsString()
  assetId: string | null;
}