import { Controller, Post, Req, UseInterceptors } from '@nestjs/common';
import { ChatbotService } from './chatbot.service';
import { ChatbotLoggerInterceptor } from './logger.interceptor';

@UseInterceptors(ChatbotLoggerInterceptor)
@Controller('chatbot')
export class ChatbotController {
  constructor(private readonly chatbotService: ChatbotService) {}

  @Post()
  msgRecieved(@Req() request: Request): string {
    const message: any = request.body;
    return this.chatbotService.msgRecieved(message.message);
  }
}
