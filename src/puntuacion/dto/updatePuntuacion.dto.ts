import { ApiProperty } from "@nestjs/swagger";

export class UpdatePuntuacionDto {
    @ApiProperty({ example: 4 })
    puntuacion: number;
}