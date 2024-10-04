import * as chai from 'chai'
import User from '../../../src/domain/entities/User'

const { expect } = chai

describe('User Entity Test', () => {
  it('Should be able to be instantiate', () => {
    const user = new User()

    expect(user).to.be.an.instanceOf(User)
  })

  it('Should be able to be instantiate with User Parameters', () => {
    const user = new User('Fulano', 'fulano@gmail.com', '123456')

    expect(user.name).to.equal('Fulano')
    expect(user.email).to.equal('fulano@gmail.com')
    expect(user.password).to.equal('123456')
  })
})
