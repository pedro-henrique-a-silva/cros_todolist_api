import * as chai from 'chai'
import { randomUUID } from 'node:crypto'
import Task from '../../../src/domain/entities/Task'

const { expect } = chai

describe('Task Entity Test', () => {
  it('Should be able to be instantiate', () => {
    const user = new Task(randomUUID(), 'Task 1', 'minha task', randomUUID())

    expect(user).to.be.an.instanceOf(Task)
  })
})
