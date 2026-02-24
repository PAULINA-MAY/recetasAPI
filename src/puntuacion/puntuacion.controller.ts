import { Body, Controller, Get, Param, ParseIntPipe, Post, Put, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/guard/auth/auth.guard';
import { PuntuacionDto } from './dto/puntuacion.dto';
import { PuntuacionService } from './puntuacion.service';
import { CreatePuntuacionDto } from './dto/createPuntuacion.dto';
import { UpdatePuntuacionDto } from './dto/updatePuntuacion.dto';
@ApiTags('puntuacion')
@Controller('puntuacion')
@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard) 

export class PuntuacionController {
    constructor(private readonly puntuacionService: PuntuacionService){}


    @Get(':recetaId')
    @ApiOperation({ summary: 'Obtener todas las puntuaciones por receta' })
  @ApiOkResponse({ type: [PuntuacionDto], description: 'Lista de puntuaciones para una receta' })
  getAllPuntuaciones(
      @Req() req,
    @Param('recetaId', ParseIntPipe) recetaId: number){
    return this.puntuacionService.getPuntuationByRecetaIdAndUsuario(recetaId, req.user.userId);
    }

    @Get(':puntuacionId/puntuacionById')
    @ApiOperation({ summary: 'Obtener una puntuación por ID' })
  @ApiOkResponse({ type: PuntuacionDto, description: 'Detalles de la puntuación' })
  getPuntuacionById(
    @Param('puntuacionId', ParseIntPipe) puntuacionId: number){
    return this.puntuacionService.getPuntuation(puntuacionId);
  }

@Post(':recetaId')
    @ApiOperation({ summary: 'Crear una nueva puntuación para una receta' })
  @ApiOkResponse({ type: PuntuacionDto, description: 'Puntuación creada exitosamente' })  
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

@Put(':recetaId/update')
    @ApiOperation({ summary: 'Actualizar una puntuación existente para una receta' })
  @ApiOkResponse({ type: PuntuacionDto, description: 'Puntuación actualizada exitosamente' })  
updatePuntuacion(
  @Param('recetaId', ParseIntPipe) recetaId: number,
  @Req() req,
  @Body() dto: UpdatePuntuacionDto,
){
  return this.puntuacionService.updatePuntuacion(recetaId, req.user.userId, dto);
}

 

}
