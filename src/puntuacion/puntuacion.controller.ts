import { Body, Controller, Get, Param, ParseIntPipe, Post, Put, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/guard/auth/auth.guard';
import { PuntuacionDto } from './dto/puntuacion.dto';
import { PuntuacionService } from './puntuacion.service';
import { CreatePuntuacionDto, ResponseCreatePuntuacionDto } from './dto/createPuntuacion.dto';
import { ResponseUpdatePuntuacionDto, UpdatePuntuacionDto } from './dto/updatePuntuacion.dto';


@ApiTags('puntuacion')
@Controller('puntuacion')
@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard) 

export class PuntuacionController {
    constructor(private readonly puntuacionService: PuntuacionService){}


    @Get(':recetaId')
    @ApiOperation({ summary: 'Obtener todas las puntuaciones por receta' })
  @ApiOkResponse({ type: [ResponseCreatePuntuacionDto], description: 'Lista de puntuaciones para una receta' })
  getAllPuntuaciones(
      @Req() req,
    @Param('recetaId', ParseIntPipe) recetaId: number){
    return this.puntuacionService.getPuntuationByRecetaIdAndUsuario(recetaId, req.user.userId);
    }

    @Get(':puntuacionId/puntuacionById')
    @ApiOperation({ summary: 'Obtener una puntuación por ID' })
  @ApiOkResponse({ type: ResponseCreatePuntuacionDto, description: 'Detalles de la puntuación' })
  getPuntuacionById(
    @Param('puntuacionId', ParseIntPipe) puntuacionId: number){
    return this.puntuacionService.getPuntuation(puntuacionId);
  }

@Post(':recetaId/:idUsuario')
    @ApiOperation({ summary: 'Crear una nueva puntuación para una receta' })
  @ApiOkResponse({ type: ResponseCreatePuntuacionDto, description: 'Puntuación creada exitosamente' })  
createPuntuacion(
  @Param('recetaId', ParseIntPipe) recetaId: number,
    @Param('idUsuario', ParseIntPipe) idUsuario: number,
  @Body() dto: CreatePuntuacionDto,
){
  return this.puntuacionService.createPuntuacion(recetaId, idUsuario, dto);
}

@Put(':recetaId/:idUsuario/actualizar')
    @ApiOperation({ summary: 'Actualizar una puntuación existente para una receta' })
  @ApiOkResponse({ type: ResponseUpdatePuntuacionDto, description: 'Puntuación actualizada exitosamente' })  
updatePuntuacion(
  @Param('recetaId', ParseIntPipe) recetaId: number,
    @Param('idUsuario', ParseIntPipe) idUsuario: number,
  @Body() dto: UpdatePuntuacionDto,
){
 return this.puntuacionService.updatePuntuacion(recetaId, idUsuario, dto);
}





 

}
