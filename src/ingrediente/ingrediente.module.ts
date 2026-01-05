import { Module } from "@nestjs/common";
import { PrismaModule } from "src/prisma/prisma.module";
import { IngredienteController } from "./ingrediente.controller";
import { IngredienteService } from "./ingrediente.service";

@Module({
        imports: [PrismaModule],
        controllers: [IngredienteController],
        providers: [IngredienteService],

})
export class IngredienteModule{
    
}