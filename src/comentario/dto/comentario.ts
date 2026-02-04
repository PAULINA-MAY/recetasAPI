export class ComentarioDto{
    comentarioId: number;
    FkUsuarioId: number;
    RecetaIngredienteIdFK:number;
    comentario:string;
    fechaDeCreacion: Date;
}
