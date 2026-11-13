import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Put, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOkResponse, ApiOperation, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "src/guard/auth/auth.guard";
import { RecetaService } from "./receta.service";
import { RecetaDto } from "./dto/receta";
import { CreateRecetaDto, ResponseCreateRecetaDto } from "./dto/create_receta_dto";
import { ResponseUpdateRecetaDto, UpdateRecetaDto } from "./dto/update_receta_dto";
import { DeleteRecetaDto, ResponseDeleteRecetaDto } from "./dto/delete-receta.dto";
import { Request } from '@nestjs/common';
import { FileInterceptor } from "@nestjs/platform-express";

@ApiTags('recetas')
@Controller('recetas')
@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard)
export class RecetaController {
    constructor(private readonly recetaService: RecetaService) { }

         @Get('Recetas/AC')
         @ApiOperation({ summary: 'Obtener todos los roles activos' })
         @ApiOkResponse({ type: [ResponseCreateRecetaDto], description: 'Lista de recetas activas.' })
         getRolesAc() {
             return this.recetaService.getRecetasAc();
         }
     
             @Get('Recetas/BA')
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
@UseInterceptors(FileInterceptor('imagen'))
@ApiOperation({ summary: 'Crear una nueva receta con imagen' })
@ApiConsumes('multipart/form-data')
@ApiBody({
  schema: {
    type: 'object',
    properties: {
      titulo: { type: 'string', example: 'Pasta roja' },
      descripcion: {
        type: 'string',
        example: 'Pasta roja con salsa de tomate',
      },
      tiempoPreparacion: { type: 'string', example: '01:30:00' },
      porcion: { type: 'number', example: 4 },
      imagen: {
        type: 'string',
        format: 'binary',
      },
    },
    required: [
      'titulo',
      'descripcion',
      'tiempoPreparacion',
      'porcion',
    ],
  },
})
@ApiOkResponse({
  type: ResponseCreateRecetaDto,
  description: 'Receta creada',
})
createReceta(
  @Param('idUser', ParseIntPipe) idUser: number,
  @Body() dto: CreateRecetaDto,
  @UploadedFile() file: Express.Multer.File,
   @Request() req,
) {
  return this.recetaService.createReceta(idUser, dto, file,  req.user.nombreCompleto,);
}

    @Put(':idReceta')
    @ApiOperation({ summary: 'Actualizar una receta por ID' })
    @ApiOkResponse({ type: ResponseUpdateRecetaDto, description: 'Receta actualizada' })
    updateReceta(@Param('idReceta', ParseIntPipe) idReceta: number, dto: UpdateRecetaDto) {
        return this.recetaService.updateReceta(idReceta, dto);
    }

@Patch(':idReceta/baja')
async deleteReceta(
  @Param('idReceta', ParseIntPipe) idReceta: number,
@Request() req,
) {
  return this.recetaService.deleteReceta(
    idReceta,
    req.user.nombreCompleto
  );
}

@Patch(':idReceta/activar')
async activarReceta(
  @Param('idReceta', ParseIntPipe) idReceta: number,
@Request() req,
) {
  return this.recetaService.activarReceta(
    idReceta,
    req.user.nombreCompleto
  );
}
}