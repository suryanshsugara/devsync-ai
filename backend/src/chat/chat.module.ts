import { Module } from '@nestjs/common';
import { ChatGateway } from './chat/chat.gateway';
import { MessagesService } from './messages/messages.service';
import { JwtModule } from '@nestjs/jwt';
import { PrismaModule } from '../prisma/prisma.module';
import { AiModule } from '../ai/ai.module';

@Module({
  imports: [PrismaModule, AiModule, JwtModule.register({ secret: process.env.JWT_SECRET || 'devsync_super_secret_jwt_key_developement_only' })],
  providers: [ChatGateway, MessagesService],
  exports: [MessagesService]
})
export class ChatModule { }
