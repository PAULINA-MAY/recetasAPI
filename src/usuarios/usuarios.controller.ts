import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Put, Req, UseGuards } from "@nestjs/common";
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
  
        @Get('All')
        @ApiOperation({ summary: 'Obtener todos los usuarios' })
        @ApiOkResponse({ type: ResponseCreateUsuarioDto, description: 'Lista de usuarios' })
        getUsuarios() {
            return this.usuariosService.getAllUsuarios();
        }

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

    @Post()
@ApiOperation({ summary: 'Registrar usuario' })

async createUsuario(
    @Body() createUsuarioDto: CreateUsuariosDto,
    @Req() req: any,
) {
    return this.usuariosService.createUsuario(
        createUsuarioDto.nombreCompleto,
        createUsuarioDto.correo,
        createUsuarioDto.contrase_a,
        req.user.nombreCompleto,
    );
}

 
@Put(':idUsuario')
@ApiOperation({summary:'Actualizar un usuario por id'})
    @ApiOkResponse({ type: ResponseUpdateUsuarioDto, description: 'El usuario ha sido actualizado.' })
updateUsuario(@Param('idUsuario', ParseIntPipe) idUsuario: number,@Body() dto: UpdateUsuariosDto){
  return this.usuariosService.updateUsuario(idUsuario,dto); 
}

@Patch(':idUsuario/baja')
@ApiOperation({summary:'Dar de baja un usuario por id'})
    @ApiOkResponse({ type: ResponseDeleteUsuarioDto, description: 'El usuario ha sido dado de baja.' })
deleteUsuario(@Param('idUsuario', ParseIntPipe) idUsuario: number, @Req() req: any){
  return this.usuariosService.deleteUsuario(idUsuario, req.user.nombreCompleto); 
}

@Patch(':idUsuario/activar')
@ApiOperation({summary:'Dar de alta un usuario por id'})
    @ApiOkResponse({ type: ResponseUpdateUsuarioDto, description: 'El usuario ha sido dado de alta.' })
restoreUsuario(@Param('idUsuario', ParseIntPipe) idUsuario: number, @Req() req: any){
  return this.usuariosService.activarUsuario(idUsuario, req.user.nombreCompleto); 
  }

}