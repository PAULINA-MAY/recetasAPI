import { Injectable, NotFoundException } from "@nestjs/common";
import { ApiResponse } from "src/global/response/response";
import { PrismaService } from "src/prisma/prisma.service";

import { CreateRecetaDto, ResponseCreateRecetaDto } from "./dto/create_receta_dto";
import { ResponseUpdateRecetaDto, UpdateRecetaDto } from "./dto/update_receta_dto";
import { DeleteRecetaDto, ResponseDeleteRecetaDto } from "./dto/delete-receta.dto";

@Injectable()
export class RecetaService {
  constructor(private prisma: PrismaService) { }
  async getRecetasAc(): Promise<ApiResponse<any[]>> {
    try {
 const rol = await this.prisma.receta.findMany({
      where: { estatus: 'AC' },
      select: {
        recetaId: true,
        titulo: true,
        usuarioIdFK: true,
        fechaDeCreacion: true,
        estatus: true,
      },
    });

  
    if (!rol || rol.length === 0) {
      return {
        status: 404,
        message: 'No se encontraron recetas activas',
        data: [],
      };
    }

    return {
      status: 200,
      message: 'Recetas obtenidas correctamente',
      data: rol,
    };
    }
      catch (err) {

      throw err;
    }
  }

    async getRecetasBa(): Promise<ApiResponse<any[]>> {
    try {
 const rol = await this.prisma.receta.findMany({
      where: { estatus: 'BA' },
      select: {
        recetaId: true,
        titulo: true,
        usuarioIdFK: true,
        fechaDeCreacion: true,
        estatus: true,
      },
    });

  
    if (!rol || rol.length === 0) {
      return {
        status: 404,
        message: 'No se encontraron recetas inactivas',
        data: [],
      };
    }

    return {
      status: 200,
      message: 'Recetas obtenidas correctamente',
      data: rol,
    };
    }
      catch (err) {

      throw err;
    }
  }


async getRecetasByiD(id: number): Promise<ApiResponse<any>> {
  try {
    const receta = await this.prisma.receta.findUnique({
      where: { recetaId: id },
      include: {
        recetaIngredientes: {
          include: {
            ingrediente: true,
            Paso: {
              select: {
                PasoId: true,
                numeroPaso: true,
                descripcion: true,
              },
            },
          },
        },
      },
    });

    if (!receta) {
      throw new NotFoundException('No se encontró la receta');
    }

    //EXTRAER DATOS
    const ingredientes = receta.recetaIngredientes.map(ri => ri.ingrediente);

    const pasos = receta.recetaIngredientes.flatMap(ri => ri.Paso);

    //RESPUESTA 
    const resultado = {
      recetaId: receta.recetaId,
      usuarioIdFK: receta.usuarioIdFK,
      titulo: receta.titulo,
      descripcion: receta.descripcion,
      tiempoPreparacion: receta.tiempoPreparacion,
      porcion: receta.porcion,
      fechaDeCreacion: receta.fechaDeCreacion,
      ingredientes,
      pasos
    };

    return {
      status: 200,
      message: 'Receta obtenida correctamente',
      data: [resultado],
    };
  } catch (err) {
    throw err;
  }
}

 async createReceta(
  idUser: number,
  dto: CreateRecetaDto,
): Promise<ApiResponse<ResponseCreateRecetaDto>> {
  try {
   const MERIDA_OFFSET_MS = -6 * 60 * 60 * 1000;

const now = new Date();
const localDate = new Date(now.getTime() + MERIDA_OFFSET_MS);

    const userExists = await this.prisma.usuario.findUnique({
      where: { usuarioId: idUser },
    });
    if (!userExists) {
      throw new NotFoundException('Usuario no encontrado');
    }
    const recetaCreated = await this.prisma.receta.create({
      data: {
        usuarioIdFK: idUser,
        descripcion: dto.descripcion,
        tiempoPreparacion: dto.tiempoPreparacion,
        porcion: dto.porcion,
        titulo: dto.titulo,
        fechaDeCreacion: localDate,
        usuarioAlta: dto.usuarioAlta,
      },
    });

      
        const res: ResponseCreateRecetaDto = {
          recetaId: recetaCreated.recetaId,
         usuarioId: recetaCreated.usuarioIdFK,
          titulo: recetaCreated.titulo,
          descripcion: recetaCreated.descripcion,
          tiempoPreparacion: recetaCreated.tiempoPreparacion,
          porcion: recetaCreated.porcion,
          fechaDeCreacion: recetaCreated.fechaDeCreacion!,
          usuarioAlta: recetaCreated.UsuarioAlta!,
          estatus: recetaCreated.estatus!,
        };
    return {
      status: 201,
      message: 'Receta creada correctamente',
      data: res,
    };
  } catch (err) {
    throw err;
  }
}

async updateReceta(
  idReceta: number,
  dto: UpdateRecetaDto,
): Promise<ApiResponse<ResponseUpdateRecetaDto>> {
  try {

        const MERIDA_OFFSET_MS = -6 * 60 * 60 * 1000;

const now = new Date();
const localDate = new Date(now.getTime() + MERIDA_OFFSET_MS);

    const recetaUpdated = await this.prisma.receta.update({
      where: { recetaId: idReceta, estatus: 'AC' },
      data: {  fechaMod: localDate , usuarioMod: dto.usuarioMod, descripcion: dto.descripcion, tiempoPreparacion: dto.tiempoPreparacion, porcion: dto.porcion, titulo: dto.titulo},
    });

    const res: ResponseUpdateRecetaDto = {
        recetaId: recetaUpdated.recetaId,
        usuarioId: recetaUpdated.usuarioIdFK,
        titulo: recetaUpdated.titulo,
        descripcion: recetaUpdated.descripcion,
        tiempoPreparacion: recetaUpdated.tiempoPreparacion,
        porcion: recetaUpdated.porcion,
        fechaMod: recetaUpdated.fechaMod!,
        usuarioMod: recetaUpdated.UsuarioMod!,
        estatus: recetaUpdated.estatus!,
      };

   


    return {
      status: 200,
      message: 'Receta actualizada correctamente',
      data: res,
    };
  } catch (err) {
    throw err;
  }
}


  async deleteReceta(idReceta: number, dto:DeleteRecetaDto): Promise<ApiResponse<ResponseDeleteRecetaDto>> {
  try {

          const MERIDA_OFFSET_MS = -6 * 60 * 60 * 1000;

const now = new Date();
const localDate = new Date(now.getTime() + MERIDA_OFFSET_MS);
    const recetaDeleted = await this.prisma.receta.update({
      where: { recetaId: idReceta },
      data: { fechaBaja: localDate, usuarioBaja: dto.usuarioBaja, estatus: 'BA' },
    });

 const res: ResponseDeleteRecetaDto= {
    recetaId: recetaDeleted.recetaId,
    usuarioId: recetaDeleted.usuarioIdFK,
    titulo: recetaDeleted.titulo,
    descripcion: recetaDeleted.descripcion,
    tiempoPreparacion: recetaDeleted.tiempoPreparacion,
    porcion: recetaDeleted.porcion,
    fechaBaja: recetaDeleted.fechaBaja!,
    usuarioBaja: recetaDeleted.UsuarioBaja!,
    estatus: recetaDeleted.estatus!,
  };
    return {
      status: 200,
      message: 'Receta eliminada correctamente',
      data: res,
    };
  } catch (err) {
    throw err;
  }
}
}









