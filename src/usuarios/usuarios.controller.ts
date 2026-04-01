import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiTags } from "@nestjs/swagger";
import { UsuariosService } from "./usuarios.service";
import { UsuariosDto } from "./dto/usuarios.dto";
import { JwtAuthGuard } from "src/guard/auth/auth.guard";
import { CreateUsuariosDto } from "./dto/create-usuario.dto";

@ApiTags('usuarios')
@Controller('usuarios')
/* @ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard)  */
export class UsuariosController{
  constructor(private readonly  usuariosService: UsuariosService){}
  
  @Get()
  @ApiOperation({summary:'Obtener todos los usuarios'})
      @ApiOkResponse({ type: [UsuariosDto], description: 'Lista de usuarios' })
  getUsuarios(){
    return this.usuariosService.getAllUsuarios();
  
  }

 @Get(':id')
  @ApiOperation({ summary: 'Obtener usuario por id' })
  @ApiOkResponse({ type: UsuariosDto, description: 'Usuario con id específico.' })
  getUsuarioById(@Param('id', ParseIntPipe) id: number) {
    return this.usuariosService.getUsuariosById(id);
  }
/*   @Post()
  @ApiOperation({summary:'Crear un nuevo usuario'})
    @ApiOkResponse({ type: UsuariosDto, description: 'El usuario ha sido creado.' })
  createUsuario(@Body() dto: CreateUsuariosDto){
    return this.usuariosService.createUsuario(dto);

   } */
 
@Put(':id')
@ApiOperation({summary:'Actualizar un usuario por id'})
    @ApiOkResponse({ type: UsuariosDto, description: 'El usuario ha sido actualizado.' })
updateUsuario(@Param('id', ParseIntPipe) id: number,@Body() dto: CreateUsuariosDto){
  return this.usuariosService.updateUsuario(id,dto.nombreCompleto,dto.correo,dto.contrase_a); 
}

@Delete(':id')
@ApiOperation({summary:'Eliminar un usuario por id'})
    @ApiOkResponse({ type: UsuariosDto, description: 'El usuario ha sido eliminado.' })
deleteUsuario(@Param('id', ParseIntPipe) id: number){
  return this.usuariosService.deleteUsuario(id);  
}


}