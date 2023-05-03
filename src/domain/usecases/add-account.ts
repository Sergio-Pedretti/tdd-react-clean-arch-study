import { AccountModel } from "@/domain/models";

export type AddAccountInput = {
    name: string
    email: string
    password: string
    passwordConfirmation: string
}

export interface AddAccount {
    add: (input: AddAccountInput) => Promise<AccountModel | null>
}