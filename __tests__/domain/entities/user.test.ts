import * as chai from 'chai'
import { randomUUID } from 'node:crypto'
import User from '../../../src/domain/entities/User'
import chaiAsPromised from 'chai-as-promised'
chai.use(chaiAsPromised)

const { expect } = chai

describe('User Entity Test', () => {
  it('Should be able to be instantiate', () => {
    const user = new User(randomUUID(), 'Fulano', 'fulano@gmail.com', '123456')

    expect(user).to.be.an.instanceOf(User)
  })
})
