import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiTags } from "@nestjs/swagger";
import { UsuariosService } from "./usuarios.service";
import { UsuariosDto } from "./dto/usuarios.dto";
import { JwtAuthGuard } from "src/guard/auth/auth.guard";
import { CreateUsuariosDto, ResponseCreateUsuarioDto } from "./dto/create-usuario.dto";
import { ResponseUpdateUsuarioDto, UpdateUsuariosDto } from "./dto/update-usuario.dto";
import { DeleteUsuarioDto, ResponseDeleteUsuarioDto } from "./dto/delete-usuario.dto";


@ApiTags('usuarios')
@Controller('usuarios')
 @ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard)  
export class UsuariosController{
  constructor(private readonly  usuariosService: UsuariosService){}
  


    @Get('Usuarios/AC')
    @ApiOperation({ summary: 'Obtener todos los usuarios activos' })
    @ApiOkResponse({ type: [ResponseCreateUsuarioDto], description: 'Lista de usuarios activos.' })
    getUsuariosAc() {
        return this.usuariosService.getUsuariosAc();
    }

        @Get('Usuarios/BA')
    @ApiOperation({ summary: 'Obtener todos los usuarios inactivos' })
    @ApiOkResponse({ type: [ResponseDeleteUsuarioDto], description: 'Lista de usuarios inactivos.' })
    getUsuariosBa() {
        return this.usuariosService.getUsuariosBa();
    }


 
@Put(':idUsuario')
@ApiOperation({summary:'Actualizar un usuario por id'})
    @ApiOkResponse({ type: ResponseUpdateUsuarioDto, description: 'El usuario ha sido actualizado.' })
updateUsuario(@Param('idUsuario', ParseIntPipe) idUsuario: number,@Body() dto: UpdateUsuariosDto){
  return this.usuariosService.updateUsuario(idUsuario,dto); 
}

@Delete(':idUsuario')
@ApiOperation({summary:'Eliminar un usuario por id'})
    @ApiOkResponse({ type: ResponseDeleteUsuarioDto, description: 'El usuario ha sido eliminado.' })
deleteUsuario(@Param('idUsuario', ParseIntPipe) idUsuario: number, @Body() dto: DeleteUsuarioDto){
  return this.usuariosService.deleteUsuario(idUsuario, dto);  
}


}