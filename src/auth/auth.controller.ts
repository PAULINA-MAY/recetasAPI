import { Body, Controller, Post } from "@nestjs/common";
import { authService } from "./auth.service";
import { LoginDto } from "./dto/loginDto.auth";
import { ApiOperation } from "@nestjs/swagger";

@Controller('auth')
export class AuthController{
    constructor(private readonly authService: authService){}

    @Post('login')
    @ApiOperation({ summary: 'Iniciar Sesión' })
async login(@Body() loginDto: LoginDto): Promise<any> {
    return await this.authService.login(loginDto);
  }
}