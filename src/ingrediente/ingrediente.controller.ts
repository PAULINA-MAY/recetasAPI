import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { IngredienteService } from "./ingrediente.service";
import { Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/guard/auth/auth.guard";
import { IngredienteDto } from "./dto/ingrediente";
import { UpdateIngredienteDto } from "./dto/updateIngrediente_dto";

@ApiTags('ingredientes')
@Controller('ingredientes')
@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard)
export class IngredienteController {
    constructor(private readonly ingredienteService: IngredienteService) { }
    @Get()
    @ApiOperation({ summary: 'Obtener todos los ingredientes' })
    @ApiOkResponse({ type: IngredienteDto, description: 'Lista de ingredientes' })
    getIngredientes() {
        return this.ingredienteService.getAllIngredientes();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Obtener un ingrediente por ID' })
    @ApiOkResponse({ type: IngredienteDto, description: 'Ingrediente obtenido correctamente' })
    getIngredienteById(@Param('id', ParseIntPipe) id: number) {
        return this.ingredienteService.getIngredienteById(id);
    }

    @Post(':id')
    @ApiOperation({ summary: 'Crear un nuevo ingrediente' })
    @ApiResponse({ type: IngredienteDto, description: 'Ingrediente creado correctamente' })
    createIngrediente(@Param('id', ParseIntPipe) id: number, dto: IngredienteDto) {
        return this.ingredienteService.createIngrediente(dto, id);
    }

    @Put(':id')
    @ApiOperation({ summary: 'Actualizar un ingrediente' })
    @ApiResponse({ type: IngredienteDto, description: 'Ingrediente actualizado correctamente' })
    updateIngrediente(@Param('id', ParseIntPipe) id: number, dto: UpdateIngredienteDto) {
        return this.ingredienteService.updateIngrediente(id, dto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Eliminar un ingrediente' })
    @ApiResponse({ type: IngredienteDto, description: 'Ingrediente eliminado correctamente' })
    deleteIngrediente(@Param('id', ParseIntPipe) id: number) {
        return this.ingredienteService.deleteIngrediente(id);
    }





}