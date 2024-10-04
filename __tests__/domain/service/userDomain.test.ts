import * as chai from 'chai'
import { randomUUID } from 'node:crypto'
import User from '../../../src/domain/entities/User'
import * as sinon from 'sinon'
import PrismaUserRepository from '../../../src/infra/database/repository/PrismaUserRepository'
import chaiAsPromised from 'chai-as-promised'
import UserDomain from '../../../src/domain/services/UserDomain'
import UserEmailAlreadyExists from '../../../src/domain/exceptions/UserEmailAlreadyExists'
chai.use(chaiAsPromised)

const { expect } = chai

describe('User Domain Test', () => {
  it('Should be able to create a user succesfully', async () => {
    const randomGeneratedUUID = randomUUID()

    const user = {
      name: 'Fulano',
      email: 'fulano@email.com',
      password: '123456',
    }

    sinon
      .stub(PrismaUserRepository.prototype, 'createUser')
      .resolves(
        new User(randomGeneratedUUID, user.name, user.email, user.password),
      )

    sinon.stub(PrismaUserRepository.prototype, 'findUserByEmail').resolves(null)

    const userService = new UserDomain()
    const createdUser = await userService.createUser(user)

    expect(createdUser).to.be.an.instanceOf(User)
    expect(createdUser.id).to.equal(randomGeneratedUUID)
  })

  it('Should not be able to create a user with existent Email', async () => {
    const randomGeneratedUUID = randomUUID()

    const user = {
      name: 'Fulano',
      email: 'fulano@email.com',
      password: '123456',
    }

    sinon
      .stub(PrismaUserRepository.prototype, 'findUserByEmail')
      .resolves(
        new User(randomGeneratedUUID, user.name, user.email, user.password),
      )

    const userService = new UserDomain()

    await expect(userService.createUser(user)).to.be.rejectedWith(
      UserEmailAlreadyExists,
    )
  })

  afterEach(sinon.restore)
})
