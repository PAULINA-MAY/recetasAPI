import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "src/guard/auth/auth.guard";
import { RecetaService } from "./receta.service";
import { RecetaDto } from "./dto/receta";
import { CreateRecetaDto, ResponseCreateRecetaDto } from "./dto/create_receta_dto";
import { ResponseUpdateRecetaDto, UpdateRecetaDto } from "./dto/update_receta_dto";
import { DeleteRecetaDto, ResponseDeleteRecetaDto } from "./dto/delete-receta.dto";

@ApiTags('recetas')
@Controller('recetas')
@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard)
export class RecetaController {
    constructor(private readonly recetaService: RecetaService) { }

         @Get('Roles/AC')
         @ApiOperation({ summary: 'Obtener todos los roles activos' })
         @ApiOkResponse({ type: [ResponseCreateRecetaDto], description: 'Lista de recetas activas.' })
         getRolesAc() {
             return this.recetaService.getRecetasAc();
         }
     
             @Get('Roles/BA')
         @ApiOperation({ summary: 'Obtener todos los roles inactivos' })
         @ApiOkResponse({ type: [ResponseDeleteRecetaDto], description: 'Lista de recetas inactivas.' })
         getRolesBa() {
             return this.recetaService.getRecetasBa();
         }

    @Get(':id')
    @ApiOperation({ summary: 'Obtener una receta por ID' })
    @ApiOkResponse({ type: RecetaDto, description: 'Receta encontrada' })
    getRecetaById(@Param('id', ParseIntPipe) id: number) {
        return this.recetaService.getRecetasByiD(id);
    }

    @Post(':idUser')
    @ApiOperation({ summary: 'Crear una nueva receta' })
    @ApiOkResponse({ type: ResponseCreateRecetaDto, description: 'Receta creada' })
    createReceta(@Param('idUser', ParseIntPipe) idUser: number,
    @Body() dto: CreateRecetaDto) {
        return this.recetaService.createReceta(idUser,dto);
    }

    @Put(':idReceta')
    @ApiOperation({ summary: 'Actualizar una receta por ID' })
    @ApiOkResponse({ type: ResponseUpdateRecetaDto, description: 'Receta actualizada' })
    updateReceta(@Param('idReceta', ParseIntPipe) idReceta: number, dto: UpdateRecetaDto) {
        return this.recetaService.updateReceta(idReceta, dto);
    }

    @Delete(':idReceta')
    @ApiOperation({ summary: 'Eliminar una receta por ID' })
    @ApiOkResponse({ type: ResponseDeleteRecetaDto, description: 'Receta eliminada' })
    deleteReceta(@Param('idReceta', ParseIntPipe) idReceta: number, @Body() dto: DeleteRecetaDto) {
        return this.recetaService.deleteReceta(idReceta, dto);
    }
}