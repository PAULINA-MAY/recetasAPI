import { Module } from '@nestjs/common';
import { CloudinaryService } from './cloudinary.service';
import { CloudinaryController } from './cloudinary.controller';
import { cloudinaryProviderFactory } from './provider/cloudinary.provider';


@Module({
   providers: [CloudinaryService, cloudinaryProviderFactory],
  controllers: [CloudinaryController],
  exports: [CloudinaryService], 
})
export class CloudinaryModule {}
