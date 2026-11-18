import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { IngredienteService } from "./ingrediente.service";
import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Put, Req, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/guard/auth/auth.guard";
import { IngredienteDto } from "./dto/ingrediente";
import { UpdateIngredienteDto } from "./dto/updateIngrediente_dto";
import {CreateIngredienteDto, ResponseCreateIngredienteDto } from "./dto/createIngrediente_dto";
import { ResponseDeleteUsuarioDto } from "src/usuarios/dto/delete-usuario.dto";

@ApiTags('ingredientes')
@Controller('ingredientes')
@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard)
export class IngredienteController {
    constructor(private readonly ingredienteService: IngredienteService) { }
    @Get('All')
    @ApiOperation({ summary: 'Obtener todos los ingredientes' })
    @ApiOkResponse({ type: IngredienteDto, description: 'Lista de ingredientes' })
    getIngredientes() {
        return this.ingredienteService.getAllIngredientes();
    }

    
        @Get('Ingredientes/AC')
        @ApiOperation({ summary: 'Obtener todos los ingredientes activos' })
        @ApiOkResponse({ type: [ResponseCreateIngredienteDto], description: 'Lista de ingredientes activos.' })
        getIngredientesAc() {
            return this.ingredienteService.getIngredientesAc();
        }
    
            @Get('Ingredientes/BA')
        @ApiOperation({ summary: 'Obtener todos los ingredientes dados de baja' })
        @ApiOkResponse({ type: [ResponseDeleteUsuarioDto], description: 'Lista de ingredientes dados de baja.' })
        getIngredientesBa() {
            return this.ingredienteService.getIngredientesBa();
        }

    @Get(':idIngrediente')
    @ApiOperation({ summary: 'Obtener un ingrediente por ID' })
    @ApiOkResponse({ type: IngredienteDto, description: 'Ingrediente obtenido correctamente' })
    getIngredienteById(@Param('idIngrediente', ParseIntPipe) id: number) {
        return this.ingredienteService.getIngredienteById(id);
    }

    @Post(':idReceta')
    @ApiOperation({ summary: 'Crear un nuevo ingrediente' })
    @ApiResponse({ type: IngredienteDto, description: 'Ingrediente creado correctamente' })
    createIngrediente(@Param('idReceta', ParseIntPipe) idReceta: number, @Body() dto: CreateIngredienteDto) {
        return this.ingredienteService.createIngrediente(dto, idReceta);
    }

    @Put(':idIngrediente')
    @ApiOperation({ summary: 'Actualizar un ingrediente' })
    @ApiResponse({ type: IngredienteDto, description: 'Ingrediente actualizado correctamente' })
    updateIngrediente(@Param('idIngrediente', ParseIntPipe) id: number, dto: UpdateIngredienteDto) {
        return this.ingredienteService.updateIngrediente(id, dto);
    }

     @Patch(':idIngrediente/baja')
    @ApiOperation({ summary: 'Dar de baja un ingrediente por ID' })
    @ApiOkResponse({ type: IngredienteDto, description: 'El ingrediente ha sido dado de baja.' })
    deleteIngrediente(@Param('idIngrediente', ParseIntPipe) idIngrediente: number, @Req() req: any) {
        return this.ingredienteService.deleteIngrediente(idIngrediente, req.user.nombreCompleto);
    }

    @Patch(':idIngrediente/activar')
    @ApiOperation({ summary: 'Activar un ingrediente por ID' })
    @ApiOkResponse({ type: IngredienteDto, description: 'El ingrediente ha sido activado.' })
    activarIngrediente(@Param('idIngrediente', ParseIntPipe) idIngrediente: number, @Req() req: any) {

        return this.ingredienteService.activarIngrediente(idIngrediente, req.user.nombreCompleto);
    }



}