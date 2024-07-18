import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, map } from 'rxjs';

@Injectable()
export class ChatbotLoggerInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();

    Logger.log({
      message: 'Request Recieved',
      id: request.body.update_id,
      command: request.body.message.text,
      user: request.body.message.from.username,
      timestamp: new Date().toISOString(),
    });

    return next.handle().pipe(
      map((data) => {
        Logger.log({
          message: 'Response Generated',
          id: request.body.update_id,
          command: request.body.message.text,
          user: request.body.message.from.username,
          response: data,
          timestamp: new Date().toISOString(),
        });
        return data;
      }),
    );
  }
}
