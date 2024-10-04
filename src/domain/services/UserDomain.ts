import PrismaUserRepository from '../../infra/database/repository/PrismaUserRepository'
import User from '../entities/User'
import UserEmailAlreadyExistsException from '../exceptions/UserEmailAlreadyExistsException'
import UserNotFoundExeption from '../exceptions/UserNotFoundExeption'
import {
  UserAuthenticated,
  UserDomainInterface,
  UserForCreateDto,
  UserForLoginDto,
} from '../interfaces/User'
import UserRepository from '../repository/UserRepository'
import { EncryptionDomain } from './EncryptionDomain'
import { randomUUID } from 'node:crypto'
import JWTDomain from './JwtDomain'
import PasswordIncorrectException from '../exceptions/PasswordIncorrectException'

export default class UserDomain implements UserDomainInterface {
  private userRepository: UserRepository = new PrismaUserRepository()

  async createUser(userData: UserForCreateDto): Promise<User> {
    const userExists = await this.userRepository.findUserByEmail(userData.email)

    if (userExists) {
      throw new UserEmailAlreadyExistsException('User already exists')
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

  async login(userData: UserForLoginDto): Promise<UserAuthenticated> {
    const userExists = await this.userRepository.findUserByEmail(userData.email)

    if (!userExists) {
      throw new UserNotFoundExeption('User Not Found exists')
    }

    const encryptionService = new EncryptionDomain()

    const passwordMatch = await encryptionService.comparePassword(
      userData.password,
      userExists.password,
    )

    if (!passwordMatch) {
      throw new PasswordIncorrectException('Password Incorrect')
    }

    const token = JWTDomain.sign({
      name: userExists.name,
      email: userExists.email,
    })

    return {
      name: userExists.name,
      email: userExists.email,
      jwt: token,
    }
  }
}
