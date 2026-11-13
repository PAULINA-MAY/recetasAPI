import { BadRequestException, Injectable } from '@nestjs/common';
import { CloudinaryResponse } from 'src/global/cloudinary.response';
import { v2 as cloudinary } from 'cloudinary';
import * as streamifier from 'streamifier';
import { PrismaService } from 'src/prisma/prisma.service';
import { ImagenDto } from './dto/imagen';

@Injectable()
export class CloudinaryService {
      constructor(private prisma: PrismaService) { }
uploadFile(file: Express.Multer.File): Promise<CloudinaryResponse> {
    if (!file) {
      throw new BadRequestException('No se envió ningún archivo');
    }

    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          resource_type: 'auto',
          folder: 'images',
        },
        (error, result) => {
          if (error) return reject(error);
          if (!result) return reject(new Error('Error al subir imagen'));

          resolve(result as CloudinaryResponse);
        },
      );

      streamifier.createReadStream(file.buffer).pipe(uploadStream);
    });
  }

async uploadPdf(file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('No se envió ningún archivo');
    }

    if (file.mimetype !== 'application/pdf') {
      throw new BadRequestException('Solo se permiten archivos PDF');
    }

    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          resource_type: 'raw',
          folder: 'pdfs',
          format: 'pdf',
        },
        (error, result) => {
          if (error) return reject(error);
          if (!result) return reject(new Error('Error al subir PDF'));

          resolve(result);
        },
      );

      streamifier.createReadStream(file.buffer).pipe(uploadStream);
    });
  }


  async uploadAndSaveImage(
    file: Express.Multer.File,
    usuarioFkId?: number,
    recetaFkId?: number,
    pasoIdFk?: number,
  ) {
    let cloudinaryResult: CloudinaryResponse | null = null;

    try {
   
      cloudinaryResult = await this.uploadFile(file);

     
      const data: any = {
        url: cloudinaryResult.secure_url,
        tipo: cloudinaryResult.resource_type,
        assetId: cloudinaryResult.public_id,
      };

      // Relaciones opcionales
      if (usuarioFkId !== undefined) {
        data.Usuario = {
          connect: { usuarioId: usuarioFkId },
        };
      }

      if (recetaFkId !== undefined) {
        data.Receta = {
          connect: { recetaId: recetaFkId },
        };
      }

      if (pasoIdFk !== undefined) {
        data.Paso = {
          connect: { PasoId: pasoIdFk },
        };
      }

      // Guardar imagen en BD
      const image = await this.prisma.imagen.create({
        data,
      });

      return image;

    } catch (error) {
      // Eliminar imagen de Cloudinary si falla el guardado
      if (cloudinaryResult?.public_id) {
        await cloudinary.uploader.destroy(
          cloudinaryResult.public_id,
          { resource_type: cloudinaryResult.resource_type },
        );
      }

      throw error;
    }
  }

  async deleteImage(assetId: string) {
  if (!assetId) {
    throw new BadRequestException('El assetId es requerido');
  }

  const result = await cloudinary.uploader.destroy(assetId, {
    resource_type: 'image',
  });

  return result;
}


   }
