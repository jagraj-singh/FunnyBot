import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Message } from 'node-telegram-bot-api';
import * as TelegramBot from 'node-telegram-bot-api';

@Injectable()
export class ChatbotService {
  static greetings = ['hello', 'hi', 'hey', 'howdy', 'greetings'];
  static responses = [
    'Hello there! What, no Hi for me? Why so formal?',
    'Hi! Did you just "hello" me? How old-school!',
    'Hello! If I had a penny for every time someone said that, I’d be able to buy a candy bar by now!',
    "Hi there! Is it me you're looking for? Because if it is, you've found the most amusing bot in town!",
    "Greetings, human! How's your quest for the perfect greeting going?",
    'Hello! I’m here to make your day 0.001% funnier. Challenge accepted!',
    'Hey! Did you know "hello" in robot language translates to "let’s have some fun"?',
    'Hi! If this were the Matrix, I’d say “Hello, Neo.”',
    'Hello! Did you just unlock the secret code for awesomeness?',
    'Hi there! You had me at hello... literally.',
  ];

  bot: TelegramBot;
  constructor(private configService: ConfigService) {
    this.bot = new TelegramBot(
      this.configService.get<string>('TELEGRAM_TOKEN'),
    );
  }

  msgRecieved(message: Message): string {
    const response = ChatbotService.generateResponse(message.text);
    this.bot.sendMessage(message.chat.id, response);
    return response;
  }

  static generateResponse(command: string) {
    command = command.trim().toLowerCase();
    if (command === '/start') {
      return 'Hi there. I am a bot who tries to be funny. Here are the list of greetings you can send. \n\nhello\nhi,\nhey,\nhowdy,\ngreetings';
    }
    if (this.greetings.includes(command)) {
      return this.responses[Math.floor(Math.random() * this.responses.length)];
    }
    return 'Invalid Command';
  }
}
