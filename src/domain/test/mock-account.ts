import { type AuthenticationInput } from '@/domain/usecases'
import { type AccountModel } from '@/domain/models'
import { faker } from '@faker-js/faker'

export const mockAuthentication = (): AuthenticationInput => ({
  email: faker.internet.email(),
  password: faker.internet.password()
})

export const mockAccountModel = (): AccountModel => ({
  accessToken: faker.datatype.uuid()
})
