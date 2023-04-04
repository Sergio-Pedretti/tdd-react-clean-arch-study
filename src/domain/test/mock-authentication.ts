import { type AuthenticationInput } from '@/domain/usecases/authentication'
import { faker } from '@faker-js/faker'

export const mockAuthentication = (): AuthenticationInput => ({
  email: faker.internet.email(),
  password: faker.internet.password()
})
