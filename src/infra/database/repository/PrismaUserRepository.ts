import { PrismaClient } from '@prisma/client'
import User from '../../../domain/entities/User'
import UserRepository from '../../../domain/repository/UserRepository'

export default class PrismaUserRepository implements UserRepository {
  private prisma: PrismaClient = new PrismaClient()

  async createUser(user: User): Promise<User> {
    const createdUser = await this.prisma.user.create({
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
        password: user.password,
      },
    })

    return new User(
      createdUser.id,
      createdUser.name,
      createdUser.email,
      createdUser.password,
    )
  }

  async findUserByEmail(email: string): Promise<User | null> {
    const userFounded = await this.prisma.user.findUnique({
      where: {
        email,
      },
    })

    if (!userFounded) {
      return null
    }

    return new User(
      userFounded.id,
      userFounded.name,
      userFounded.email,
      userFounded.password,
    )
  }
}
