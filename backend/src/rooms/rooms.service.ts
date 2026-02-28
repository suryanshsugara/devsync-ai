import { Injectable, ConflictException, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateRoomDto } from './dto/create-room.dto';

@Injectable()
export class RoomsService {
    constructor(private prisma: PrismaService) { }

    async create(userId: string, createRoomDto: CreateRoomDto) {
        try {
            // Create room and add owner as member in a single transaction
            return await this.prisma.$transaction(async (tx) => {
                const room = await tx.room.create({
                    data: {
                        name: createRoomDto.name,
                        ownerId: userId,
                    },
                });

                await tx.roomMember.create({
                    data: {
                        roomId: room.id,
                        userId: userId,
                    },
                });

                return room;
            });
        } catch (error) {
            if (error.code === 'P2002') {
                // Unique constraint failed on the fields: (`ownerId`,`name`)
                throw new ConflictException('You already have a room with this name');
            }
            throw error;
        }
    }

    async findAllForUser(userId: string) {
        return this.prisma.room.findMany({
            where: {
                members: {
                    some: {
                        userId: userId,
                    },
                },
            },
            include: {
                _count: {
                    select: { members: true },
                },
            },
            orderBy: { createdAt: 'desc' },
        });
    }

    async findOne(roomId: string, userId: string) {
        const room = await this.prisma.room.findUnique({
            where: { id: roomId },
            include: {
                members: {
                    include: {
                        user: { select: { id: true, email: true, role: true } },
                    }
                },
                messages: {
                    orderBy: { createdAt: 'asc' },
                    take: 50, // Load last 50 messages
                    include: {
                        user: { select: { id: true, email: true } }
                    }
                }
            }
        });

        if (!room) {
            throw new NotFoundException('Room not found');
        }

        // Verify user is a member
        const isMember = room.members.some(member => member.userId === userId);
        if (!isMember) {
            throw new ForbiddenException('You are not a member of this room');
        }

        return room;
    }

    async joinRoom(roomId: string, userId: string) {
        const room = await this.prisma.room.findUnique({ where: { id: roomId } });
        if (!room) {
            throw new NotFoundException('Room not found');
        }

        try {
            await this.prisma.roomMember.create({
                data: {
                    roomId,
                    userId,
                },
            });
            return { message: 'Successfully joined room' };
        } catch (error) {
            if (error.code === 'P2002') {
                // Unique constraint failed on (`userId`, `roomId`)
                throw new ConflictException('You are already a member of this room');
            }
            throw error;
        }
    }

    async deleteRoom(roomId: string, userId: string) {
        const room = await this.prisma.room.findUnique({ where: { id: roomId } });
        if (!room) {
            throw new NotFoundException('Room not found');
        }

        if (room.ownerId !== userId) {
            throw new ForbiddenException('Only the room owner can delete this room');
        }

        await this.prisma.room.delete({
            where: { id: roomId },
        });

        return { message: 'Room deleted successfully' };
    }
}
