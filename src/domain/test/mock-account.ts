import { AddAccountInput, type AuthenticationInput } from '@/domain/usecases'
import { type AccountModel } from '@/domain/models'
import { faker } from '@faker-js/faker'

export const mockAuthentication = (): AuthenticationInput => ({
  email: faker.internet.email(),
  password: faker.internet.password()
})

export const mockAddAccount = (): AddAccountInput => {
  const password = faker.internet.password()
  return  {
    name: faker.name.fullName(),
    email: faker.internet.email(),
    password,
    passwordConfirmation: password,
  }
}

export const mockAccountModel = (): AccountModel => ({
  accessToken: faker.datatype.uuid()
})
