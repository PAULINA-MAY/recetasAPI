import { Module } from "@nestjs/common";
import { PrismaModule } from "src/prisma/prisma.module";
import { RecetaController } from "./receta.controller";
import { RecetaService } from "./receta.service";
import { PrismaService } from "src/prisma/prisma.service";
import { CloudinaryModule } from "src/cloudinary/cloudinary.module";

@Module({
    imports: [PrismaModule, CloudinaryModule],
    controllers: [RecetaController],
    providers: [RecetaService],
})
export class RecetaModule { 
    
}
