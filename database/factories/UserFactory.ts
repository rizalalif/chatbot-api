import User from 'App/Models/User'
import Factory from '@ioc:Adonis/Lucid/Factory'

export default Factory.define(User, ({ faker }) => {
  return {
    email: `${faker.name.firstName()}@gmail.com`,
    username: faker.name.firstName(),
    password: '12345678'
  }
}).build()
