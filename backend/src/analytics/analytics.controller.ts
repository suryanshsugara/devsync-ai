import { Controller, Get, UseGuards, Param } from '@nestjs/common';
import { AnalyticsService } from './analytics.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { Role } from '@prisma/client';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('analytics')
export class AnalyticsController {
    constructor(private readonly analyticsService: AnalyticsService) { }

    @Get('platform')
    @Roles(Role.TEAM_LEAD) // Only team leads get global stats
    getPlatformStats() {
        return this.analyticsService.getPlatformStats();
    }

    @Get('room/:roomId')
    @Roles(Role.TEAM_LEAD)
    getRoomStats(@Param('roomId') roomId: string) {
        return this.analyticsService.getRoomStats(roomId);
    }
}
