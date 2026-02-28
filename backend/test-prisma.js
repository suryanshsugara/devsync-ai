const { PrismaClient } = require('@prisma/client');
try {
    console.log("Initializing Prisma...");
    const prisma = new PrismaClient({ log: ['query', 'info', 'warn', 'error'] });
    prisma.$connect()
        .then(() => {
            console.log("Connected successfully!");
            return prisma.user.findMany();
        })
        .then(users => console.log("Users:", users.length))
        .catch(e => {
            console.error("Connection Error:");
            console.error(e);
            console.error(e.message);
        })
        .finally(() => prisma.$disconnect());
} catch (e) {
    console.error("Initialization Error:");
    console.error(e);
}
