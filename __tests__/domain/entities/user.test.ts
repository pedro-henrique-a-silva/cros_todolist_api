import * as chai from 'chai'
import { randomUUID } from 'node:crypto'
import User from '../../../src/domain/entities/User'

const { expect } = chai

describe('User Entity Test', () => {
  it('Should be able to be instantiate', () => {
    const user = new User(randomUUID(), 'Fulano', 'fulano@gmail.com', '123456')

    expect(user).to.be.an.instanceOf(User)
  })
})
