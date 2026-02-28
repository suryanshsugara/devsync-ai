import { Controller, Get, Post, Body, Param, UseGuards, Request, Delete } from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('rooms')
export class RoomsController {
    constructor(private readonly roomsService: RoomsService) { }

    @Post()
    create(@Request() req: any, @Body() createRoomDto: CreateRoomDto) {
        return this.roomsService.create(req.user.userId, createRoomDto);
    }

    @Get()
    findAll(@Request() req: any) {
        return this.roomsService.findAllForUser(req.user.userId);
    }

    @Get(':id')
    findOne(@Param('id') id: string, @Request() req: any) {
        return this.roomsService.findOne(id, req.user.userId);
    }

    @Post(':id/join')
    joinRoom(@Param('id') id: string, @Request() req: any) {
        return this.roomsService.joinRoom(id, req.user.userId);
    }

    @Delete(':id')
    remove(@Param('id') id: string, @Request() req: any) {
        return this.roomsService.deleteRoom(id, req.user.userId);
    }
}
