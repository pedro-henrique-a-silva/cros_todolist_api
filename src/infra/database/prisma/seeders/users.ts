import { PrismaClient } from '@prisma/client'
import * as bcrypt from 'bcrypt'

const prisma = new PrismaClient()

export default async function measureSeed() {
  const hashedPassword = await bcrypt.hash('123456', 10)
  await prisma.user.createMany({
    data: [
      {
        id: 'da500959-00cc-4c5f-8fc8-b82242fee018',
        name: 'John Doe',
        email: 'john@doe.com',
        password: hashedPassword,
        createdAt: new Date('2021-10-10'),
        updatedAt: new Date('2021-10-10'),
      },
    ],
  })
}
