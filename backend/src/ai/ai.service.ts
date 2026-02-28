import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AiService {
    private readonly logger = new Logger(AiService.name);
    private readonly MAX_TOKENS = 4000;

    constructor(private prisma: PrismaService) { }

    /**
     * Main entrypoint for asking AI a question based on room context.
     */
    async askAi(roomId: string, userMessage: string, userId: string): Promise<string> {
        try {
            // 1. Fetch recent room messages
            const recentMessages = await this.prisma.message.findMany({
                where: { roomId },
                orderBy: { createdAt: 'desc' },
                take: 10,
            });

            // 2. Format Context
            const contextStr = recentMessages
                .reverse() // Order chronologically
                .map(m => `${m.isAi ? 'AI' : 'User'}: ${m.content}`)
                .join('\n');

            const systemPrompt = `You are DevSync AI debugger. Review the shared code context and user request. Your response MUST be strictly formatted as JSON: {"ai_response": "string", "confidence_score": 1-10}`;

            // 3. Truncate context if needed (Stub: We use string length as a fast heuristic if tiktoken isn't installed)
            let prompt = `System: ${systemPrompt}\n\nContext:\n${contextStr}\n\nCurrent Request:${userMessage}`;
            if (prompt.length > this.MAX_TOKENS * 4) {
                this.logger.warn(`Truncating prompt for room ${roomId}`);
                prompt = prompt.substring(prompt.length - (this.MAX_TOKENS * 4));
            }

            // 4. Call Provider (Mocking OpenAI for now since no keys are configured)
            const mockAiResponse = await this.callAiProviderMock(prompt);

            // 5. Log AI Usage
            await this.prisma.aiUsageLog.create({
                data: {
                    roomId,
                    userId,
                    tokensUsed: prompt.length / 4, // heuristic
                    provider: 'openai-mock',
                }
            });

            return mockAiResponse;
        } catch (error) {
            this.logger.error(`AI Integration failed: ${error.message}`);
            return '{"ai_response": "The AI module is temporarily unavailable or overloaded.", "confidence_score": 0}';
        }
    }

    private async callAiProviderMock(prompt: string): Promise<string> {
        return new Promise((resolve) => {
            // Simulate network latency (2 seconds)
            setTimeout(() => {
                resolve(JSON.stringify({
                    ai_response: "Based on the context, it looks like you are building an AI service. Looks great! Let me know if you need specific debugging help.",
                    confidence_score: 9
                }));
            }, 2000);
        });
    }
}
