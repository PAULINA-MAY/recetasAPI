import { Body, Controller, Get, Param, ParseIntPipe, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/guard/auth/auth.guard';
import { PuntuacionDto } from './dto/puntuacion.dto';
import { PuntuacionService } from './puntuacion.service';
import { CreatePuntuacionDto } from './dto/createPuntuacion.dto';
@ApiTags('puntuacion')
@Controller('puntuacion')
@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard) 

export class PuntuacionController {
    constructor(private readonly puntuacionService: PuntuacionService){}


    @Get(':recetaId')
    @ApiOperation({ summary: 'Get all puntuaciones for a receta' })
  @ApiOkResponse({ type: [PuntuacionDto], description: 'Lista de puntuaciones para una receta' })
  getAllPuntuaciones(
      @Req() req,
    @Param('recetaId', ParseIntPipe) recetaId: number){
    return this.puntuacionService.getPuntuationByRecetaIdAndUsuario(recetaId, req.user.userId);
    }

    @Get(':puntuacionId')
    @ApiOperation({ summary: 'Get a puntuacion by id' })
  @ApiOkResponse({ type: PuntuacionDto, description: 'Puntuacion details' })
  getPuntuacionById(
    @Param('puntuacionId', ParseIntPipe) puntuacionId: number){
    return this.puntuacionService.getPuntuation(puntuacionId);
  }

@Post(':recetaId')
createPuntuacion(
  @Param('recetaId', ParseIntPipe) recetaId: number,
  @Req() req,
  @Body() dto: CreatePuntuacionDto,
){
  return this.puntuacionService.createPuntuacion({
    ...dto,
    IdUsuarioFK: req.user.userId,
    RecetaIngredienteFKId: recetaId,
  });
}

}
