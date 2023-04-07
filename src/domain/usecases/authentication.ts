import { type AccountModel } from '@/domain/models'

export interface Authentication {
  auth: (input: AuthenticationInput) => Promise<AccountModel | undefined>
}

export type AuthenticationInput = {
  email: string
  password: string
}
