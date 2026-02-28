import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AnalyticsService {
    constructor(private prisma: PrismaService) { }

    async getPlatformStats() {
        // Stats for TEAM_LEAD users to view
        try {
            const [totalUsers, totalRooms, totalMessages, totalAiUsage] = await Promise.all([
                this.prisma.user.count(),
                this.prisma.room.count(),
                this.prisma.message.count(),
                this.prisma.aiUsageLog.aggregate({
                    _sum: { tokensUsed: true },
                }).catch(() => ({ _sum: { tokensUsed: 0 } })),
            ]);

            return {
                totalUsers,
                totalRooms,
                totalMessages,
                totalAiTokensUsed: totalAiUsage?._sum?.tokensUsed || 0,
            };
        } catch (e) {
            console.error('Analytics Fetch Error:', e);
            return {
                totalUsers: 0,
                totalRooms: 0,
                totalMessages: 0,
                totalAiTokensUsed: 0,
            };
        }
    }

    async getRoomStats(roomId: string) {
        const room = await this.prisma.room.findUnique({
            where: { id: roomId },
            include: {
                _count: {
                    select: { members: true, messages: true, aiUsageLogs: true }
                }
            }
        });
        return room;
    }
}
