import { Body, Controller, Delete, Get, Param, ParseArrayPipe, ParseIntPipe, Post, Put, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/guard/auth/auth.guard';
import { PasoService } from './paso.service';
import { PasoDto } from './dto/paso.dto';
import { CreatePasoDto, ResponseCreatePasoDto } from './dto/createPaso.dto';
import { UpdatePasoDto } from './dto/updatePaso.dto';

@ApiTags('paso')
@Controller('paso')
@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard) 
export class PasoController {

    constructor(private readonly pasoService: PasoService) {}

    @Get('All')
    @ApiOperation({ summary: 'Obtener todos los  pasos' })
  @ApiOkResponse({ type: [PasoDto], description: 'Lista de pasos' })
  getAllPasos(){
    return this.pasoService.getAllPasos();
    }
    
         @Get('Pasos/AC')
         @ApiOperation({ summary: 'Obtener todos los pasos activos' })
         @ApiOkResponse({ type: [ResponseCreatePasoDto], description: 'Lista de pasos activos.' })
         getPasosAc() {
             return this.pasoService.getPasosAc();
         }
     
             @Get('Pasos/BA')
         @ApiOperation({ summary: 'Obtener todos los pasos inactivos' })
         @ApiOkResponse({ type: [ResponseCreatePasoDto], description: 'Lista de pasos inactivos.' })
         getPasosBa() {
             return this.pasoService.getPasosBa();
         }

    @Get(':id')
    @ApiOperation({ summary: 'Obtener un paso por ID' })
  @ApiOkResponse({ type: [ResponseCreatePasoDto], description: 'Paso obtenido por ID' })
  getPasoById(@Param('id', ParseIntPipe) id: number){
    return this.pasoService.getPasoByid(id);
    }
@Post(':recetaId/pasos')
@ApiOperation({ summary: 'Registrar pasos de una receta' })
@ApiBody({
  type: CreatePasoDto,
  isArray: true,
})
createPaso(
  @Param('recetaId', ParseIntPipe) recetaId: number,
  @Body(new ParseArrayPipe({ items: CreatePasoDto })) dto: CreatePasoDto[],
  @Req() req: any,
) {
  return this.pasoService.createPaso(
    recetaId,
    dto,
    req.user.nombreCompleto,
  );
}

@Put(':id')
@ApiOperation({ summary: 'Update paso by ID' })
@ApiBody({ type: UpdatePasoDto })
@ApiOkResponse({
  type: [ResponseCreatePasoDto],
  description: 'Paso actualizado por ID',
})
updatePaso(
  @Param('id', ParseIntPipe) id: number,
  @Body() dto: UpdatePasoDto,
) {
  return this.pasoService.updatePaso(id, dto);
}

    @Delete(':id')
    @ApiOperation({ summary: 'Delete paso by ID' })
  @ApiOkResponse({ type: [ResponseCreatePasoDto], description: 'Paso eliminado por ID' })
  deletePaso(@Param('id', ParseIntPipe) id: number){
    return this.pasoService.deletePaso(id);
    }
}
