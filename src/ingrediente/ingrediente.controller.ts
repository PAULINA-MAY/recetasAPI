import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiTags } from "@nestjs/swagger";
import { IngredienteService } from "./ingrediente.service";
import { Controller, Get, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/guard/auth/auth.guard";

@ApiTags('ingredientes')
@Controller('ingredientes')
@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard)
export class IngredienteController {
    constructor(private readonly ingredienteService: IngredienteService) { }  
    @Get()
    @ApiOperation({ summary: 'Obtener todos los ingredientes' })
    @ApiOkResponse({ type: '', description: 'Lista de ingredientes' })
    getIngredientes() {
        return 'function not implemented yet';
    }

    
}