import { type AccountModel } from '../models/account-model'

export interface Authentication {
  auth: (input: AuthenticationInput) => Promise<AccountModel>
}

type AuthenticationInput = {
  email: string
  password: string
}
