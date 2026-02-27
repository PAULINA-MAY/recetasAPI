import {
  Controller,
  Post,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from './cloudinary.service';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/guard/auth/auth.guard';

@ApiTags('Cloudinary')
@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard) 
@Controller('imagenes')
export class CloudinaryController {
  constructor(private cloudinaryService: CloudinaryService) {}

  //SUBIR IMAGEN
  @Post('upload-image')
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Subir imagen a Cloudinary' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  uploadImage(@UploadedFile() file: Express.Multer.File) {
    return this.cloudinaryService.uploadFile(file);
  }

  // SUBIR PDF
  @Post('upload-pdf')
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Subir PDF a Cloudinary' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  uploadPdf(@UploadedFile() file: Express.Multer.File) {
    return this.cloudinaryService.uploadPdf(file);
  }

 @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data') 
  @ApiBody({
    description: 'Archivo de imagen',
    required: true,
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary', 
        },
      },
    },
  })
  @ApiQuery({ name: 'usuarioFkId', required: false, type: Number })
  @ApiQuery({ name: 'recetaFkId', required: false, type: Number })
  @ApiQuery({ name: 'pasoIdFk', required: false, type: Number })
  async uploadAndSaveImage(
    @UploadedFile() file: Express.Multer.File,
    @Query('usuarioFkId') usuarioFkId?: string,
    @Query('recetaFkId') recetaFkId?: string,
    @Query('pasoIdFk') pasoIdFk?: string,
  ) {
    return this.cloudinaryService.uploadAndSaveImage(
      file,
      usuarioFkId ? Number(usuarioFkId) : undefined,
      recetaFkId ? Number(recetaFkId) : undefined,
      pasoIdFk ? Number(pasoIdFk) : undefined,
    );
  }

     }