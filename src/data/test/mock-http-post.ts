import { type HttpPostClientInput } from '@/data/protocols/http'
import { faker } from '@faker-js/faker'

export const mockPostRequest = (): HttpPostClientInput<unknown> => ({
  url: faker.internet.url(),
  body: faker.datatype.json()
})
