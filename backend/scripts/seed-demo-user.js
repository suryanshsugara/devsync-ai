const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function seed() {
    await prisma.user.upsert({
        where: { email: 'demo@devsync.com' },
        update: { role: 'TEAM_LEAD' },
        create: {
            id: '1',
            email: 'demo@devsync.com',
            passwordHash: 'not-needed',
            role: 'TEAM_LEAD',
        },
    });
    console.log('Seeded demo user!');
}
seed().finally(() => prisma.$disconnect());
