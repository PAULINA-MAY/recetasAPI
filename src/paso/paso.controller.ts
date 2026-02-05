import { Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/guard/auth/auth.guard';
import { PasoService } from './paso.service';
import { PasoDto } from './dto/paso.dto';
import { CreatePasoDto } from './dto/createPaso.dto';

@ApiTags('paso')
@Controller('paso')
@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard) 
export class PasoController {

    constructor(private readonly pasoService: PasoService) {}

    @Get()
    @ApiOperation({ summary: 'Get all pasos' })
  @ApiOkResponse({ type: [PasoDto], description: 'Lista de pasos' })
  getAllPasos(){
    return this.pasoService.getAllPasos();
    }
    

    @Get(':id')
    @ApiOperation({ summary: 'Get paso by ID' })
  @ApiOkResponse({ type: [PasoDto], description: 'Paso obtenido por ID' })
  getPasoById(@Param('id', ParseIntPipe) id: number){
    return this.pasoService.getPasoByid(id);
    }

   @Post(':recetaId')
    @ApiOperation({ summary: 'Create paso for a receta' })
  @ApiOkResponse({ type: [PasoDto], description: 'Paso creado para una receta' })
  createPaso(@Param('recetaId', ParseIntPipe)recetaId: number, dto: CreatePasoDto){
    return this.pasoService.createPaso(recetaId, dto);
    }


    @Put(':id')
    @ApiOperation({ summary: 'Update paso by ID' })
  @ApiOkResponse({ type: [PasoDto], description: 'Paso actualizado por ID' })
  updatePaso(@Param('id', ParseIntPipe) id: number, dto: PasoDto){
    return this.pasoService.updatePaso(id, dto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete paso by ID' })
  @ApiOkResponse({ type: [PasoDto], description: 'Paso eliminado por ID' })
  deletePaso(@Param('id', ParseIntPipe) id: number){
    return this.pasoService.deletePaso(id);
    }
}
