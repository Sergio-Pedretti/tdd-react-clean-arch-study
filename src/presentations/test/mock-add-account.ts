import { AddAccount, type AddAccountInput } from '@/domain/usecases'
import { type AccountModel } from '@/domain/models'
import { mockAccountModel } from '@/domain/test'

export class AddAccountSpy implements AddAccount {
  account = mockAccountModel()
  input: AddAccountInput
  countCalls = 0
  async add (input: AddAccountInput): Promise<AccountModel | undefined> {
    this.input = input
    this.countCalls++
    return await Promise.resolve(this.account)
  }
}
