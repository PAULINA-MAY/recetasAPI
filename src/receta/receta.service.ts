import { Injectable, NotFoundException } from "@nestjs/common";
import { ApiResponse } from "src/global/response/response";
import { PrismaService } from "src/prisma/prisma.service";
import { RecetaDto } from "./dto/receta";
import { RecetaModel } from "generated/prisma/models";

@Injectable()
export class RecetaService {
  constructor(private prisma: PrismaService ) { }
  async getAllRecetas(): Promise <ApiResponse<RecetaModel[]>> {
try {
      const recetas = await this.prisma.receta.findMany();
      console.log("Recetas:", recetas);
    if(!recetas ||recetas.length === 0){
         throw new NotFoundException('No se encontraron roles');
  }else{
    return {
      status: 200,
      message: 'Recetas obtenidas correctamente',
      data: recetas,
    };
  }
  
} catch (err) {
  throw err;
}
  }
}