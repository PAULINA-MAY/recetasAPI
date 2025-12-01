import { Controller, Get } from "@nestjs/common";
import { ApiOkResponse, ApiOperation, ApiTags } from "@nestjs/swagger";
import { UsuariosService } from "./usuarios.service";
import { UsuariosDto } from "./dto/usuarios.dto";

@ApiTags('usuarios')
@Controller('usuarios')
export class UsuariosController{
  constructor(private readonly  usuariosService: UsuariosService){}
  
  @Get()
  @ApiOperation({summary:'Get all usuarios'})
      @ApiOkResponse({ type: [UsuariosDto], description: 'List of usuarios.' })
  getUsuarios(){
    return this.usuariosService.getAllUsuarios();
  
  }
  

}