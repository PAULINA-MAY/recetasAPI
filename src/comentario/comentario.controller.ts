import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiTags } from "@nestjs/swagger";
import { ComentarioService } from "./comentario.service";
import { Body, Controller, Get, Param, ParseIntPipe, Post, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/guard/auth/auth.guard";
import { CreateChatGatewayDto } from "src/chatGateway/dto/create-chatGateway_dto";
import { ComentarioDto } from "src/chatGateway/dto/chatGateway_dto";


@ApiTags('comentario')
@Controller('comentario')
@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard) 
export class ComentarioController {
  constructor(private readonly comentarioService: ComentarioService) {}


  @Get()
      @ApiOperation({ summary: 'Get all comentarios' })
    @ApiOkResponse({ type: [ComentarioDto], description: 'Lista de comentarios' })
  getAllComentarios() {
    return this.comentarioService.getAllComentarios();
  }

  
  @Get('receta/:id')
        @ApiOperation({ summary: 'Get comentarios by receta' })
    @ApiOkResponse({ type: [ComentarioDto], description: 'Lista de comentarios' })
  getComentariosByReceta(
    @Param('id', ParseIntPipe) id: number
  ) {
    return this.comentarioService.getComentariosByReceta(id);
  }


  @Post('receta/:id/:idUsuario')
          @ApiOperation({ summary: 'Crear un nuevo comentario' })
    @ApiOkResponse({ type: [CreateChatGatewayDto ], description: 'Lista de comentarios' })
  createComentario(
    @Param('id', ParseIntPipe) id: number,
    @Param('idUsuario', ParseIntPipe) idUsuario: number,
    @Body() dto: CreateChatGatewayDto
  ) {
    return this.comentarioService.createComentario(id, idUsuario, dto);
  }
}