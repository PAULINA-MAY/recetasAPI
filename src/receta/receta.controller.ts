import { Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "src/guard/auth/auth.guard";
import { RecetaService } from "./receta.service";
import { RecetaDto } from "./dto/receta";
import { CreateRecetaDto } from "./dto/create_receta_dto";
import { UpdateRecetaDto } from "./dto/update_receta_dto";

@ApiTags('recetas')
@Controller('recetas')
@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard)
export class RecetaController {
    constructor(private readonly recetaService: RecetaService) { }
    @Get()
    @ApiOperation({ summary: 'Obtener todas las recetas' })
    @ApiOkResponse({ type: [RecetaDto], description: 'Lista de recetas' })
    getRecetas() {
        return this.recetaService.getAllRecetas();
    }


    @Get(':id')
    @ApiOperation({ summary: 'Obtener una receta por ID' })
    @ApiOkResponse({ type: RecetaDto, description: 'Receta encontrada' })
    getRecetaById(@Param('id', ParseIntPipe) id: number) {
        return this.recetaService.getRecetasByiD(id);
    }

    @Post()
    @ApiOperation({ summary: 'Crear una nueva receta' })
    @ApiOkResponse({ type: RecetaDto, description: 'Receta creada' })
    createReceta(@Param('id', ParseIntPipe) id: number, dto: CreateRecetaDto) {
        return this.recetaService.createReceta(id, dto);
    }

    @Put(':id')
    @ApiOperation({ summary: 'Actualizar una receta por ID' })
    @ApiOkResponse({ type: RecetaDto, description: 'Receta actualizada' })
    updateReceta(@Param('id', ParseIntPipe) id: number, dto: UpdateRecetaDto) {
        return this.recetaService.updateReceta(id, dto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Eliminar una receta por ID' })
    @ApiOkResponse({ type: RecetaDto, description: 'Receta eliminada' })
    deleteReceta(@Param('id', ParseIntPipe) id: number) {
        return this.recetaService.deleteReceta(id);
    }
}