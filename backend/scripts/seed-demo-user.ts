import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function seedDemoUser() {
    await prisma.user.upsert({
        where: { email: 'demo@devsync.com' },
        update: { role: 'TEAM_LEAD' },
        create: {
            id: '1',
            email: 'demo@devsync.com',
            passwordHash: 'not-needed-for-demo-mode',
            role: 'TEAM_LEAD',
        },
    });
    console.log('Demo user seeded successfully!');
}

seedDemoUser()
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
