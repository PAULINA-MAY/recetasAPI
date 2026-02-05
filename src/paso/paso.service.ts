import { Injectable } from '@nestjs/common';
import { PasoModel } from 'generated/prisma/models';
import { ApiResponse } from 'src/global/response/response';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateRecetaDto } from 'src/receta/dto/update_receta_dto';
import { UpdatePasoDto } from './dto/updatePaso.dto';
import { CreatePasoDto } from './dto/createPaso.dto';

@Injectable()
export class PasoService {
    constructor(private readonly prisma: PrismaService) { }

    async  getAllPasos():Promise<ApiResponse<PasoModel[]>> {
        try {
            
            const pasos = await this.prisma.paso.findMany();
            return {
                status: 200,
                message: 'Pasos obtenidos correctamente',
                data: pasos,
            };
        } catch (err) {
            throw err;
        }
}

async getPasoByid(id: number):Promise<ApiResponse<PasoModel[]>> {
    try {
        const paso = await this.prisma.paso.findMany({
            where: {
                PasoId: id
            }
        });
        return {
            status: 200,
            message: 'Paso obtenido correctamente',
            data: paso,
        };
    } catch (err) {
        throw err;
    }
}
 async createPaso(idReceta: number, dto: CreatePasoDto):Promise<ApiResponse<PasoModel[]>> {
    const data = dto.pasos.map(paso => ({
      numeroPaso: paso.numeroPaso,
      descripcion: paso.descripcion,
      recetaIngredienteIdFK: idReceta,
    }));

  await this.prisma.paso.createMany({ data });
  
    const createdPasos = await this.prisma.paso.findMany({
    where: { recetaIngredienteIdFK: idReceta },
    orderBy: {  PasoId: 'asc' },
  });
    return { status: 201, message: 'Pasos creados correctamente', data: createdPasos };
  }


async updatePaso(id: number, dto: UpdatePasoDto):Promise<ApiResponse<PasoModel[]>> {
    try {
        const updatedPaso = await this.prisma.paso.update({
            where: {
                PasoId: id
            },
         data: { ...dto },
        });
        return {
            status: 200,
            message: 'Paso actualizado correctamente',
            data: [updatedPaso],
        };  
    } catch (err) {
        throw err;
    }
}
async deletePaso(id: number):Promise<ApiResponse<PasoModel[]>> {
    try {
        const deletedPaso = await this.prisma.paso.delete({
            where: {
                PasoId: id
            }
        });
        return {
            status: 200,
            message: 'Paso eliminado correctamente',
            data: [deletedPaso],
        };
    } catch (err) {
        throw err;
    }
}



 
    
}

