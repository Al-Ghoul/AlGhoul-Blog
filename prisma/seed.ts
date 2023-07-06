import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
    await prisma.language.createMany({
        data: [
            { code: 'ar', name: 'العربية' },
            { code: 'en', name: 'English' }
        ]
    });
    ;
}
main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })