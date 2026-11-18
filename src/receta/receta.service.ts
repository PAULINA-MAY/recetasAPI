import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { ApiResponse } from "src/global/response/response";
import { PrismaService } from "src/prisma/prisma.service";

import { CreateRecetaDto, ResponseCreateRecetaDto } from "./dto/create_receta_dto";
import { ResponseUpdateRecetaDto, UpdateRecetaDto } from "./dto/update_receta_dto";
import { DeleteRecetaDto, ResponseDeleteRecetaDto } from "./dto/delete-receta.dto";
import { CloudinaryService } from "src/cloudinary/cloudinary.service";

@Injectable()
export class RecetaService {
  constructor(private prisma: PrismaService, private cloudinaryService: CloudinaryService) { }



      async getAllRecetas(): Promise<ApiResponse<any>> {
     try{
      const recetas = await this.prisma.receta.findMany();

      if (!recetas || recetas.length === 0) {
        throw new NotFoundException('No se encontraron recetas');
      } else {
        return {
          status: 200,
          message: 'Recetas obtenidas correctamente',
          data: recetas,
        };
      }

     } catch(err){
        throw err;
     }


    }

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
        Imagen: {
          select: {
            imagenId: true,
            url: true,
            tipo: true,
            assetId: true,
          },
        },
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
  } catch (err) {
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
        Imagen: {
          select: {
            imagenId: true,
            url: true,
            tipo: true,
            assetId: true,
          },
        },
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
  file: Express.Multer.File,
  nombreCompleto: string,
): Promise<ApiResponse<ResponseCreateRecetaDto>> {

  const MERIDA_OFFSET_MS = -6 * 60 * 60 * 1000;

  const now = new Date();
  const localDate = new Date(now.getTime() + MERIDA_OFFSET_MS);

  // Verificar usuario
  const userExists = await this.prisma.usuario.findUnique({
    where: { usuarioId: idUser },
  });

  if (!userExists) {
    throw new NotFoundException('Usuario no encontrado');
  }

  let imagenId: number | null = null;


  if (file) {
    const imagenCreated = await this.cloudinaryService.uploadAndSaveImage(
      file,
      idUser,
    );

    imagenId = imagenCreated.imagenId;
  }


  try {
    const recetaCreated = await this.prisma.receta.create({
      data: {
        usuarioIdFK: idUser,
        descripcion: dto.descripcion,
        tiempoPreparacion: dto.tiempoPreparacion,
        porcion: dto.porcion,
        titulo: dto.titulo,
        fechaDeCreacion: localDate,
        UsuarioAlta: nombreCompleto,
        imagenIdFK: imagenId,
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

  } catch (error) {

    // Si falla la receta, eliminar también la imagen
    if (imagenId !== null) {
      const imagen = await this.prisma.imagen.findUnique({
        where: { imagenId },
      });

      if (imagen?.assetId) {
        await this.cloudinaryService.deleteImage(imagen.assetId);
      }

      await this.prisma.imagen.delete({
        where: { imagenId },
      });
    }

    throw error;
  }
}


async updateReceta(
 idReceta: number,
  dto: UpdateRecetaDto,
  file: Express.Multer.File,
  nombreCompleto: string,
   
): Promise<ApiResponse<ResponseUpdateRecetaDto>> {

  const MERIDA_OFFSET_MS = -6 * 60 * 60 * 1000;

  const now = new Date();
  const localDate = new Date(now.getTime() + MERIDA_OFFSET_MS);

  try {

    // 1. Verificar que la receta exista y esté activa
    const recetaExists = await this.prisma.receta.findFirst({
      where: {
        recetaId: idReceta,
        estatus: 'AC',
      },
      include: {
        Imagen: true,
      },
    });

    if (!recetaExists) {
      throw new NotFoundException('Receta no encontrada');
    }

    // 2. Preparar los datos de actualización
    const dataUpdate: any = {
      fechaMod: localDate,
      UsuarioMod: nombreCompleto,
      descripcion: dto.descripcion,
      tiempoPreparacion: dto.tiempoPreparacion,
      porcion: dto.porcion,
      titulo: dto.titulo,
    };

    // 3. Verificar si el cliente envió una imagen
    if (file) {

      // 4. Verificar si la receta ya tiene una imagen
      if (recetaExists.imagenIdFK !== null) {

        // Ya tiene imagen: reemplazar la imagen existente
        await this.cloudinaryService.updateImage(
          recetaExists.Imagen!.assetId!,
          file,
        );

      } else {

        // No tiene imagen: subir y guardar una nueva
        const imagenCreated =
          await this.cloudinaryService.uploadAndSaveImage(
            file,
            recetaExists.usuarioIdFK,
          );

        // Relacionar la nueva imagen con la receta
        dataUpdate.imagenIdFK = imagenCreated.imagenId;
      }
    }

    // 5. Actualizar la receta
    const recetaUpdated = await this.prisma.receta.update({
      where: {
        recetaId: idReceta,
      },
      data: dataUpdate,
    });

    // 6. Construir respuesta
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



async activarReceta(
  idReceta: number,
  usuarioAlta: string,
): Promise<ApiResponse<ResponseUpdateRecetaDto>> {
  try {
    // 1. Buscar la receta
    const receta = await this.prisma.receta.findUnique({
      where: { recetaId: idReceta },
    });


    if (!receta) {
      throw new NotFoundException('La receta no existe');
    }


    if (receta.estatus === 'AC') {
      throw new ConflictException('La receta ya está da activa');
    }

    const MERIDA_OFFSET_MS = -6 * 60 * 60 * 1000;

    const now = new Date();
    const localDate = new Date(now.getTime() + MERIDA_OFFSET_MS);

   
    const recetaDeleted = await this.prisma.receta.update({
      where: { recetaId: idReceta },
      data: {
        UsuarioMod: usuarioAlta,
        fechaMod: localDate,
        estatus: receta.estatus!,
      },
    });

    // 5. Preparar respuesta
    const res: ResponseUpdateRecetaDto = {
      recetaId: recetaDeleted.recetaId,
      usuarioId: recetaDeleted.usuarioIdFK,
      titulo: recetaDeleted.titulo,
      descripcion: recetaDeleted.descripcion,
      tiempoPreparacion: recetaDeleted.tiempoPreparacion,
      porcion: recetaDeleted.porcion,
      fechaMod: recetaDeleted.fechaMod!,
      usuarioMod: recetaDeleted.UsuarioMod!,
      estatus: recetaDeleted.estatus!,
    };

    return {
      status: 200,
      message: 'La receta se activó correctamente',
      data: res,
    };

  } catch (err) {
    throw err;
  }
} 

async deleteReceta(
  idReceta: number,
  usuarioBaja: string,
): Promise<ApiResponse<ResponseDeleteRecetaDto>> {
  try {
    // 1. Buscar la receta
    const receta = await this.prisma.receta.findUnique({
      where: { recetaId: idReceta },
    });


    if (!receta) {
      throw new NotFoundException('La receta no existe');
    }


    if (receta.estatus === 'BA') {
      throw new ConflictException('La receta ya está dada de baja');
    }

    const MERIDA_OFFSET_MS = -6 * 60 * 60 * 1000;

    const now = new Date();
    const localDate = new Date(now.getTime() + MERIDA_OFFSET_MS);

   
    const recetaDeleted = await this.prisma.receta.update({
      where: { recetaId: idReceta },
      data: {
        UsuarioBaja: usuarioBaja,
        fechaBaja: localDate,
        estatus: 'BA',
      },
    });

    // 5. Preparar respuesta
    const res: ResponseDeleteRecetaDto = {
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
      message: 'La receta se dio de baja correctamente',
      data: res,
    };

  } catch (err) {
    throw err;
  }
}
}













