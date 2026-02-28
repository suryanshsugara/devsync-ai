import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    canActivate(context: ExecutionContext) {
        const request = context.switchToHttp().getRequest();
        const authHeader = request.headers.authorization;

        // DEMO MODE BYPASS
        if (authHeader && authHeader === 'Bearer mock-demo-token') {
            request.user = { sub: '1', email: 'demo@devsync.com', role: 'TEAM_LEAD' };
            return true;
        }

        return super.canActivate(context);
    }
}
