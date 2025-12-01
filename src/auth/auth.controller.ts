import { Body, Controller, Post } from "@nestjs/common";
import { authService } from "./auth.service";
import { LoginDto } from "./dto/loginDto.auth";
import { ApiOperation } from "@nestjs/swagger";
import { CreateUsuariosDto } from "src/usuarios/dto/create-usuario.dto";

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
async registro(@Body() createUsuarioDto: CreateUsuariosDto) {
  return this.authService.registro(createUsuarioDto);
}


}