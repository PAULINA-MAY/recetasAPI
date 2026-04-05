import { Module } from "@nestjs/common";
import { ChatGateway } from "./dto/chatGateway.websocket";
import { ComentarioService } from "src/comentario/comentario.service";

@Module({
  providers: [ChatGateway, ComentarioService],
  exports: [ChatGateway],
})
export class ChatGatewayModule {}