import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatGatewayService } from '../chatGateway.service';
import { CreateChatGatewayDto } from './create-chatGateway_dto';

@WebSocketGateway({ cors: { origin: '*' } })
export class ChatGateway {
  @WebSocketServer()
  server: Server;

  constructor(private readonly chatGatewayService: ChatGatewayService) {}

  @SubscribeMessage('crear-comentario')
  async handleCrearComentario(@MessageBody() dto: CreateChatGatewayDto) {
    const comentario = await this.chatGatewayService.createComentario(
        dto
    );

    this.server.emit('comentario-creado', comentario);

    return comentario;
  }

  @SubscribeMessage('eliminar-comentario')
  async handleEliminarComentario(@MessageBody() idComentario: number) {
    const comentario = await this.chatGatewayService.deleteComentario(
        idComentario
    );
    this.server.emit('comentario-eliminado', comentario);
    return comentario;
  }

  @SubscribeMessage('mensaje')
  async handleUpdateMenssage(@MessageBody() idComentario:number,comentario:string) {
    const comentarioActualizado = await this.chatGatewayService.updateComentario(
        idComentario,comentario
    );
    this.server.emit('comentario-actualizado', comentarioActualizado);
    return comentarioActualizado;


  }

}
