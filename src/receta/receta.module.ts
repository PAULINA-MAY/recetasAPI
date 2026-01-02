import { Module } from "@nestjs/common";
import { PrismaModule } from "src/prisma/prisma.module";
import { RecetaController } from "./receta.controller";
import { RecetaService } from "./receta.service";

@Module({
    imports: [PrismaModule],
    controllers: [RecetaController],
    providers: [RecetaService],
})
export class RecetaModule { 
    
}
