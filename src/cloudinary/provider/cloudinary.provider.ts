import { ConfigService } from '@nestjs/config';
import { v2 as cloudinary, ConfigOptions } from 'cloudinary'; 

export const cloudinaryProviderFactory = {
  provide: 'CLOUDINARY_PROVIDER',
  useFactory: (configService: ConfigService) => {
    const cloudinaryConfig: ConfigOptions = {
      cloud_name: configService.get<any>('cloudinary.cloud_name'),
      api_key: configService.get<any>('cloudinary.api_key'),
      api_secret: configService.get<any>('cloudinary.api_secret'),
    };
    return cloudinary.config(cloudinaryConfig);
  },
  inject: [ConfigService]
};