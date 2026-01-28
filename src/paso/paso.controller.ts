import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/guard/auth/auth.guard';
import { PasoService } from './paso.service';
import { PasoDto } from './dto/paso.dto';

@ApiTags('paso')
@Controller('paso')
@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard) 
export class PasoController {

    constructor(private readonly pasoService: PasoService) {}

    @Get()
    @ApiOperation({ summary: 'Get all pasos' })
  @ApiOkResponse({ type: [PasoDto], description: 'Lista de pasos' })
  getAllPasos(){
    return this.pasoService.getAllPasos();
  }

}
