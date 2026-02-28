import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
  ConnectedSocket,
  MessageBody,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { MessagesService } from '../messages/messages.service';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../../prisma/prisma.service';
import { Logger } from '@nestjs/common';
import { AiService } from '../../ai/ai.service'; // Added AI Service Import

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  private logger = new Logger('ChatGateway');

  constructor(
    private messagesService: MessagesService,
    private jwtService: JwtService,
    private prisma: PrismaService,
    private aiService: AiService // Injected AI Service
  ) { }

  async handleConnection(client: Socket) {
    try {
      const token = client.handshake.auth.token || client.handshake.headers['authorization']?.split(' ')[1];
      if (!token) {
        client.disconnect();
        return;
      }

      // DEMO MODE BYPASS
      if (token === 'mock-demo-token') {
        client.data.user = { sub: '1', email: 'demo@devsync.com', role: 'TEAM_LEAD' };
        this.logger.log(`Client connected (Demo Mode): ${client.id}`);
        return;
      }

      // Verify JWT manually
      const payload = this.jwtService.verify(token, {
        secret: process.env.JWT_SECRET || 'devsync_super_secret_jwt_key_developement_only',
      });

      // Attach user to socket
      client.data.user = payload;
      this.logger.log(`Client connected: ${client.id} (User: ${payload.email})`);
    } catch (err) {
      this.logger.error(`Connection error: ${err.message}`);
      client.disconnect();
    }
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('joinRoom')
  async handleJoinRoom(
    @ConnectedSocket() client: Socket,
    @MessageBody() payload: { roomId: string },
  ) {
    const user = client.data.user;
    if (!user) return;

    // Verify membership
    const isMember = await this.prisma.roomMember.findUnique({
      where: {
        userId_roomId: {
          userId: user.sub,
          roomId: payload.roomId,
        }
      }
    });

    if (!isMember) {
      client.emit('error', { message: 'Not authorized for this room' });
      return;
    }

    client.join(payload.roomId);
    this.logger.log(`User ${user.email} joined room: ${payload.roomId}`);

    // Notify room
    client.to(payload.roomId).emit('userJoined', { email: user.email });
  }

  @SubscribeMessage('sendMessage')
  async handleMessage(
    @ConnectedSocket() client: Socket,
    @MessageBody() payload: { roomId: string; content: string },
  ) {
    const user = client.data.user;
    if (!user || !payload.content.trim()) return;

    // Save message to DB
    const savedMsg = await this.messagesService.createMessage(
      payload.roomId,
      user.sub,
      payload.content,
      false
    );

    // Broadcast to everyone in the room (including sender to standardize UI handling)
    this.server.to(payload.roomId).emit('newMessage', savedMsg);

    // AI Check Trigger
    if (payload.content.includes('@ai')) {
      this.server.to(payload.roomId).emit('aiTyping', { isTyping: true });

      const aiResponseJsonStr = await this.aiService.askAi(
        payload.roomId,
        payload.content,
        user.sub
      );

      try {
        const aiResponse = JSON.parse(aiResponseJsonStr);
        const savedAiMsg = await this.messagesService.createMessage(
          payload.roomId,
          null, // AI message
          aiResponse.ai_response,
          true
        );
        this.server.to(payload.roomId).emit('newMessage', savedAiMsg);
      } catch (err) {
        this.logger.error(`Failed to parse AI response: ${err.message}`);
      } finally {
        this.server.to(payload.roomId).emit('aiTyping', { isTyping: false });
      }
    }
  }
}
