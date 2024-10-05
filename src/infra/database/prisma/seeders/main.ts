import { PrismaClient } from '@prisma/client'
import userSeed from './users'
import taskSeed from './tasks'

const prisma = new PrismaClient()

async function main() {
  await userSeed()
  await taskSeed()
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
