import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Put, Req, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOkResponse, ApiOperation, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "src/guard/auth/auth.guard";
import { RecetaService } from "./receta.service";
import { RecetaDto } from "./dto/receta";
import { CreateRecetaDto, ResponseCreateRecetaDto } from "./dto/create_receta_dto";
import { ResponseUpdateRecetaDto, UpdateRecetaDto } from "./dto/update_receta_dto";
import { DeleteRecetaDto, ResponseDeleteRecetaDto } from "./dto/delete-receta.dto";
import { Request } from '@nestjs/common';
import { FileInterceptor } from "@nestjs/platform-express";
import { ResponseUpdateRoleDto } from "src/roles/dto/update-role.dto";

@ApiTags('recetas')
@Controller('recetas')
@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard)
export class RecetaController {
    constructor(private readonly recetaService: RecetaService) { }

                  @Get('All')
                  @ApiOperation({ summary: 'Obtener todas las recetas' })
                  @ApiOkResponse({ type: ResponseCreateRecetaDto, description: 'Lista de recetas' })
                  getRecetas() {
                      return this.recetaService.getAllRecetas();
                  }

         @Get('Recetas/AC')
         @ApiOperation({ summary: 'Obtener todas las recetas activas' })
         @ApiOkResponse({ type: [ResponseCreateRecetaDto], description: 'Lista de recetas activas.' })
         getRecetasAc() {
             return this.recetaService.getRecetasAc();
         }
     
             @Get('Recetas/BA')
         @ApiOperation({ summary: 'Obtener todas las recetas inactivas' })
         @ApiOkResponse({ type: [ResponseDeleteRecetaDto], description: 'Lista de recetas inactivas.' })
         getRecetasBa() {
             return this.recetaService.getRecetasBa();
         }

    @Get(':idReceta')
    @ApiOperation({ summary: 'Obtener una receta por ID' })
    @ApiOkResponse({ type: RecetaDto, description: 'Receta encontrada' })
    getRecetaById(@Param('idReceta', ParseIntPipe) id: number) {
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
@UseInterceptors(FileInterceptor('file'))
@ApiOperation({ summary: 'Actualizar una receta por ID' })
@ApiConsumes('multipart/form-data')
@ApiBody({
  schema: {
    type: 'object',
    properties: {
      titulo: { type: 'string', example: 'Pasta roja' },
      descripcion: {
        type: 'string',
        example: 'Pasta roja con salsa de tomate y albahaca',
      },
      tiempoPreparacion: { type: 'string', example: '01:30:00' },
      porcion: { type: 'number', example: 4 },
      file: {
        type: 'string',
        format: 'binary',
      },
    },
  },
})
@ApiOkResponse({
  type: ResponseUpdateRecetaDto,
  description: 'Receta actualizada',
})
updateReceta(
  @Param('idReceta', ParseIntPipe) idReceta: number,
  @Body() dto: UpdateRecetaDto,
  @UploadedFile() file: Express.Multer.File,
  @Request() req,
) {
  return this.recetaService.updateReceta(
    idReceta,
    dto,
    file,
    req.user.nombreCompleto,
  );
}



@Patch(':idReceta/baja')
  @ApiOperation({ summary: 'Dar de baja una receta por ID' })
      @ApiOkResponse({ type: ResponseUpdateRoleDto, description: 'La receta ha sido dado de baja.' })
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
  @ApiOperation({ summary: 'Dar de alta una receta por ID' })
      @ApiOkResponse({ type: ResponseUpdateRoleDto, description: 'La receta ha sido dado de alta.' })
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