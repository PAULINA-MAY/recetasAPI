import { Controller, Get, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "src/guard/auth/auth.guard";
import { RecetaService } from "./receta.service";
import { RecetaDto } from "./dto/receta";

@ApiTags('recetas')
@Controller('recetas')
@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard)
export class RecetaController {
    constructor(private readonly recetaService:RecetaService){}
    @Get()
    @ApiOperation({summary:'Obtener todas las recetas'})
    @ApiOkResponse({ type: [RecetaDto], description: 'Lista de recetas' })
    getRecetas(){
        return this.recetaService.getAllRecetas();
    }
    


}