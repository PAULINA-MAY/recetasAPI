export class ImagenDto {
  usuarioFkId?: number;
  recetaFkId?: number;
  pasoIdFk?: number;
  url: string;
  tipo: string;
  assetId?: string;     
  fechaCreacion?: Date;
}
