import PrismaUserRepository from '../../infra/database/repository/PrismaUserRepository'
import User from '../entities/User'
import UserEmailAlreadyExists from '../exceptions/UserEmailAlreadyExists'
import {
  UserAuthenticated,
  UserDomainInterface,
  UserForCreateDto,
  UserForLoginDto,
} from '../interfaces/User'
import UserRepository from '../repository/UserRepository'
import { EncryptionDomain } from './EncryptionDomain'
import { randomUUID } from 'node:crypto'

export default class UserDomain implements UserDomainInterface {
  private userRepository: UserRepository = new PrismaUserRepository()

  async createUser(userData: UserForCreateDto): Promise<User> {
    const userExists = await this.userRepository.findUserByEmail(userData.email)

    if (userExists) {
      throw new UserEmailAlreadyExists('User already exists')
    }

    const encryptionService = new EncryptionDomain()

    const hashedPassword = await encryptionService.hashPassword(
      userData.password,
    )

    const user = new User(
      randomUUID(),
      userData.name,
      userData.email,
      hashedPassword,
    )

    const userCreated = await this.userRepository.createUser(user)

    return userCreated
  }

  login(user: UserForLoginDto): UserAuthenticated {
    throw new Error('Method not implemented.')
  }
}
