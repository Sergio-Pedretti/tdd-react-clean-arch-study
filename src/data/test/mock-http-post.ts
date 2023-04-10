import { type HttpPostClientInput } from '@/data/protocols/http'
import { faker } from '@faker-js/faker'

export const mockPostRequest = (): HttpPostClientInput<any> => ({
  url: faker.internet.url(),
  body: faker.datatype.json()
})
