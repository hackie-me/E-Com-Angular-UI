import factory from '@adonisjs/lucid/factories'
import Shop from '#models/shop'
import { DateTime } from 'luxon'

export const ShopFactory = factory
  .define(Shop, async ({ faker }) => {
    return {
      createdAt: DateTime.fromJSDate(faker.date.past()), 
      updatedAt: DateTime.fromJSDate(faker.date.recent()),
      author_name: faker.person.fullName(),
      email: faker.internet.email(),
      phone: faker.phone.number(),
      logo: faker.image.url(),
      description: faker.lorem.paragraph(),
      company_name: faker.company.name(),
      website: faker.internet.url(),
      country: faker.location.country(),
      state: faker.location.state(),
      city: faker.location.city(),
    }
  })
  .build()