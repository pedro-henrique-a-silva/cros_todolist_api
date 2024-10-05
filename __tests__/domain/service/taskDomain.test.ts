import * as chai from 'chai'
import { randomUUID } from 'node:crypto'
import User from '../../../src/domain/entities/User'
import * as sinon from 'sinon'
import chaiAsPromised from 'chai-as-promised'
import PrismaUserRepository from '../../../src/infra/database/repository/PrismaUserRepository'
import PrismaTaskRepository from '../../../src/infra/database/repository/PrismaTaskRepository'
import Task from '../../../src/domain/entities/Task'
import TaskDomain from '../../../src/domain/services/TaskDomain'
import UserNotFoundExeption from '../../../src/domain/exceptions/UserNotFoundExeption'
chai.use(chaiAsPromised)

const { expect } = chai

describe('Task Domain Test', () => {
  it('Should be able to create a new Task succesfully', async () => {
    const userId = randomUUID()
    const taskId = randomUUID()

    const user = {
      name: 'Fulano',
      email: 'fulano@email.com',
      password: '123456',
    }

    sinon
      .stub(PrismaUserRepository.prototype, 'findUserByEmail')
      .resolves(new User(userId, user.name, user.email, user.password))

    sinon
      .stub(PrismaTaskRepository.prototype, 'createTask')
      .resolves(new Task(taskId, 'task 1', 'content 1', userId))

    const userService = new TaskDomain()
    const createdTask = await userService.createTask({
      title: 'task 1',
      content: 'content 1',
      email: user.email,
    })

    expect(createdTask).to.be.an.instanceOf(Task)
    expect(createdTask.id).to.equal(taskId)
    expect(createdTask.title).to.equal('task 1')
    expect(createdTask.content).to.equal('content 1')
    expect(createdTask.userId).to.equal(userId)
  })

  it('Should not be able to create a new Task with Nonexistent user', async () => {
    sinon.stub(PrismaUserRepository.prototype, 'findUserByEmail').resolves(null)

    const userService = new TaskDomain()
    const toCreateTask = {
      title: 'task 1',
      content: 'content 1',
      email: 'wrong@email.com',
    }

    await expect(userService.createTask(toCreateTask)).to.be.rejectedWith(
      UserNotFoundExeption,
    )
  })

  it('Should be able to return a list of Tasks ', async () => {
    const userId = randomUUID()
    const taskId = randomUUID()

    const user = {
      name: 'Fulano',
      email: 'fulano@email.com',
      password: '123456',
    }

    const listOfTasks = [
      new Task(taskId, 'task 1', 'content 1', userId),
      new Task(taskId, 'task 1', 'content 1', userId),
      new Task(taskId, 'task 1', 'content 1', userId),
    ]

    sinon
      .stub(PrismaUserRepository.prototype, 'findUserByEmail')
      .resolves(new User(userId, user.name, user.email, user.password))

    sinon
      .stub(PrismaTaskRepository.prototype, 'findAllTasks')
      .resolves(listOfTasks)

    const userService = new TaskDomain()

    const tasks = await userService.findAllTasks(user.email)

    expect(tasks).to.be.an('array')
    expect(tasks).to.have.lengthOf(3)
  })

  it('Should be able to update a task succesfully', async () => {
    const userId = randomUUID()
    const taskId = randomUUID()

    const user = {
      name: 'Fulano',
      email: 'fulano@email.com',
      password: '123456',
    }

    sinon
      .stub(PrismaUserRepository.prototype, 'findUserByEmail')
      .resolves(new User(userId, user.name, user.email, user.password))

    sinon
      .stub(PrismaTaskRepository.prototype, 'updateTask')
      .resolves(new Task(taskId, 'Task 1', 'content 1', userId))

    const userService = new TaskDomain()

    const tasks = await userService.updateTask(
      taskId,
      {
        title: 'Task 1',
        content: 'content 1',
        status: 'DONE',
      },
      user.email,
    )

    expect(tasks).to.be.an.instanceOf(Task)
    expect(tasks.id).to.equal(taskId)
    expect(tasks.title).to.equal('Task 1')
    expect(tasks.content).to.equal('content 1')
    expect(tasks.userId).to.equal(userId)
  })

  it('Should not be able to update a Task with Nonexistent user', async () => {
    const taskId = randomUUID()

    const user = {
      name: 'Fulano',
      email: 'fulano@email.com',
      password: '123456',
    }

    sinon.stub(PrismaUserRepository.prototype, 'findUserByEmail').resolves(null)

    const userService = new TaskDomain()

    await expect(
      userService.updateTask(
        taskId,
        {
          title: 'Task 1',
          content: 'content 1',
          status: 'DONE',
        },
        user.email,
      ),
    ).to.be.rejectedWith(UserNotFoundExeption)
  })

  it('Should be able to return a list of Subtasks ', async () => {
    const userId = randomUUID()
    const taskId = randomUUID()

    const user = {
      name: 'Fulano',
      email: 'fulano@email.com',
      password: '123456',
    }

    const listOfTasks = [
      new Task(taskId, 'task 1', 'content 1', userId),
      new Task(taskId, 'task 1', 'content 1', userId),
      new Task(taskId, 'task 1', 'content 1', userId),
    ]

    sinon
      .stub(PrismaUserRepository.prototype, 'findUserByEmail')
      .resolves(new User(userId, user.name, user.email, user.password))

    sinon
      .stub(PrismaTaskRepository.prototype, 'findAllSubtasks')
      .resolves(listOfTasks)

    const userService = new TaskDomain()

    const tasks = await userService.findAllSubtasks(taskId, user.email)

    expect(tasks).to.be.an('array')
    expect(tasks).to.have.lengthOf(3)
  })

  afterEach(sinon.restore)
})
