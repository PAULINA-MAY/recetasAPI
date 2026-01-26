import { OmitType, PartialType } from "@nestjs/swagger";
import { ChatGatewayDto } from "./chatGateway_dto";

export class CreateChatGatewayDto extends PartialType(OmitType(ChatGatewayDto, ['comentarioId'] as const)) {
    
}