import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { CreateChatGatewayDto } from './create-chatGateway_dto';
import { ComentarioService } from 'src/comentario/comentario.service';
import { Param } from '@nestjs/common';

@WebSocketGateway({ cors: { origin: '*' } })
export class ChatGateway {
  @WebSocketServer()
  server!: Server;

  constructor(private readonly comentarioService: ComentarioService) {}

  @SubscribeMessage('crear-comentario')
  async handleCrearComentario( @Param('idReceta') idReceta: number, @Param('idUsuario') idUsuario: number, @MessageBody() dto: CreateChatGatewayDto) {
    const comentario = await this.comentarioService.createComentario(
        idReceta,
        idUsuario,
        dto
    );

    this.server.emit('comentario-creado', comentario);

    return comentario;
  }

  @SubscribeMessage('eliminar-comentario')
  async handleEliminarComentario(@MessageBody() idComentario: number) {
    const comentario = await this.comentarioService.deleteComentario(
        idComentario
    );
    this.server.emit('comentario-eliminado', comentario);
    return comentario;
  }

  @SubscribeMessage('mensaje')
  async handleUpdateMenssage(@MessageBody() idComentario:number,comentario:string) {
    const comentarioActualizado = await this.comentarioService.updateComentario(
        idComentario,comentario
    );
    this.server.emit('comentario-actualizado', comentarioActualizado);
    return comentarioActualizado;


  }

}
