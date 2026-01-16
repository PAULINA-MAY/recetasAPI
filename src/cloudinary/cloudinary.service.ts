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
    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { resource_type: 'auto', folder: 'images'},
        
        (error, result) => {
          if (error) return reject(error);
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
    //  Subir a Cloudinary
    cloudinaryResult = await this.uploadFile(file);
    // Construir DTO
    const imagenDto: ImagenDto = {
      usuarioFkId,
      recetaFkId,
      pasoIdFk,
      url: cloudinaryResult.secure_url,
      tipo: cloudinaryResult.resource_type,
      assetId: cloudinaryResult.public_id,
    };

    //  Construir data dinámicamente
    const data: any = {
url: imagenDto.url,
  tipo: imagenDto.tipo,
  assetId: cloudinaryResult.public_id,
    };

if (imagenDto.usuarioFkId !== undefined) data.Usuario = { connect: { usuarioId: imagenDto.usuarioFkId } };
if (imagenDto.recetaFkId !== undefined) data.Receta = { connect: { recetaId: imagenDto.recetaFkId } };
if (imagenDto.pasoIdFk !== undefined) data.Paso = { connect: { PasoId: imagenDto.pasoIdFk } };

    //  Guardar en BD
    const image = await this.prisma.imagen.create({ data });

    return image;
  } catch (error) {
    //  Rollback Cloudinary
    if (cloudinaryResult?.public_id) {
      await cloudinary.uploader.destroy(cloudinaryResult.public_id);
    }
    throw error;
  }
}


   }
