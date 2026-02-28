import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class MessagesService {
    constructor(private prisma: PrismaService) { }

    async createMessage(roomId: string, userId: string | null, content: string, isAi: boolean = false) {
        const message = await this.prisma.message.create({
            data: {
                roomId,
                userId,
                content,
                isAi,
            },
            include: {
                user: {
                    select: { id: true, email: true }
                }
            }
        });
        return message;
    }

    async getRecentMessages(roomId: string, limit: number = 10) {
        return this.prisma.message.findMany({
            where: { roomId },
            orderBy: { createdAt: 'desc' },
            take: limit,
            include: {
                user: { select: { id: true, email: true } }
            }
        });
    }
}
