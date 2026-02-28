const fs = require('fs');
try {
    const { PrismaClient } = require('@prisma/client');
    const prisma = new PrismaClient();
    prisma.$connect()
        .then(() => { fs.writeFileSync('error.txt', 'Connected Successfully'); process.exit(0); })
        .catch(e => { fs.writeFileSync('error.txt', e.stack || e.toString()); process.exit(1); });
} catch (e) {
    fs.writeFileSync('error.txt', e.stack || e.toString());
}
