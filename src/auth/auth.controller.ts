import { Body, Controller, Post } from "@nestjs/common";
import { authService } from "./auth.service";
import { LoginDto } from "./dto/loginDto.auth";
import { ApiOkResponse, ApiOperation } from "@nestjs/swagger";
import { CreateUsuariosDto, ResponseCreateUsuarioDto } from "src/usuarios/dto/create-usuario.dto";
import { UsuariosDto } from "src/usuarios/dto/usuarios.dto";

@Controller('auth')
export class AuthController{
    constructor(private readonly authService: authService){}

    @Post('login')
    @ApiOperation({ summary: 'Iniciar Sesión' })
async login(@Body() loginDto: LoginDto): Promise<any> {
    return await this.authService.login(loginDto);
  }

@Post('registro')
   @ApiOperation({ summary: 'Registrar Usuario' })
       @ApiOkResponse({ type: ResponseCreateUsuarioDto, description: 'El usuario se ha regsitrado' })
async registro(@Body() createUsuarioDto: CreateUsuariosDto) {
  return this.authService.registro(createUsuarioDto);
}


}