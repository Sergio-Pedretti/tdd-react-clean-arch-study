import { type Authentication, type AuthenticationInput } from '@/domain/usecases'
import { type AccountModel } from '@/domain/models'
import { mockAccountModel } from '@/domain/test'

export class AuthenticationSpy implements Authentication {
  account = mockAccountModel()
  input: AuthenticationInput
  countCalls = 0
  async auth (input: AuthenticationInput): Promise<AccountModel | undefined> {
    console.log(input)
    this.input = input
    this.countCalls++
    return await Promise.resolve(this.account)
  }
}
