import { Injectable } from '@nestjs/common';

import { ApiResponse } from 'src/global/response/response';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdatePasoDto } from './dto/updatePaso.dto';
import { CreatePasoDto } from './dto/createPaso.dto';

@Injectable()
export class PasoService {
    constructor(private readonly prisma: PrismaService) { }



    async  getAllPasos():Promise<ApiResponse<any>> {
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

async getPasosAc(): Promise<ApiResponse<any[]>> {
  try {
    const pasos = await this.prisma.paso.findMany({
      where: {
        estatus: 'AC',
      },
      select: {
        PasoId: true,
        recetaIngredienteIdFK: true,
        numeroPaso: true,
        descripcion: true,
        estatus: true,
        imagenIdFK: true,
        usuarioAlta: true,
        usuarioMod: true,
        fechaMod: true,
      },
      orderBy: {
        PasoId: 'asc',
      },
    });

    if (!pasos || pasos.length === 0) {
      return {
        status: 404,
        message: 'No se encontraron pasos activos',
        data: [],
      };
    }

    return {
      status: 200,
      message: 'Pasos activos obtenidos correctamente',
      data: pasos,
    };

  } catch (err) {
    throw err;
  }
}

async getPasosBa(): Promise<ApiResponse<any[]>> {
  try {
    const pasos = await this.prisma.paso.findMany({
      where: {
        estatus: 'BA',
      },
      select: {
        PasoId: true,
        recetaIngredienteIdFK: true,
        numeroPaso: true,
        descripcion: true,
        estatus: true,
        imagenIdFK: true,
        usuarioAlta: true,
        usuarioBaja: true,
        fechaBaja: true,
        usuarioMod: true,
        fechaMod: true,
      },
      orderBy: {
        PasoId: 'asc',
      },
    });

    if (!pasos || pasos.length === 0) {
      return {
        status: 404,
        message: 'No se encontraron pasos dados de baja',
        data: [],
      };
    }

    return {
      status: 200,
      message: 'Pasos dados de baja obtenidos correctamente',
      data: pasos,
    };

  } catch (err) {
    throw err;
  }
}

async getPasoByid(id: number):Promise<ApiResponse<any>> {
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
async createPaso(
  idReceta: number,
  dto: CreatePasoDto[],
  usuarioAlta: string,
): Promise<ApiResponse<any>> {

  const data = dto.map(paso => ({
    numeroPaso: paso.numeroPaso,
    descripcion: paso.descripcion,
    estatus: 'AC',
    recetaIngredienteIdFK: idReceta,
    usuarioAlta: usuarioAlta,
  }));

  await this.prisma.paso.createMany({
    data,
  });

  const createdPasos = await this.prisma.paso.findMany({
    where: {
      recetaIngredienteIdFK: idReceta,
    },
    orderBy: {
      PasoId: 'asc',
    },
  });

  return {
    status: 201,
    message: 'Pasos creados correctamente',
    data: createdPasos,
  };
}


async updatePaso(id: number, dto: UpdatePasoDto):Promise<ApiResponse<any>> {
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
async deletePaso(id: number):Promise<ApiResponse<any>> {
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

