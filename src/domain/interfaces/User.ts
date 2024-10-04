import User from '../entities/User'

export interface UserInterface {
  id: string
  name: string
  email: string
  password: string
}

export interface UserForCreateDto {
  name: string
  email: string
  password: string
}

export interface UserForLoginDto {
  email: string
  password: string
}

export interface UserAuthenticated {
  email: string
  jwt: string
}

export interface UserDomainInterface {
  createUser(userData: UserForCreateDto): Promise<User>
  login(user: UserForLoginDto): UserAuthenticated
}
