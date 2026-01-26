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
}
