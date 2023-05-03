import { HttpPostClient } from "@/data/protocols/http";
import { AccountModel } from "@/domain/models";
import { AddAccount, AddAccountInput } from "@/domain/usecases";

export class RemoteAddAccount implements AddAccount {
    constructor(
        private readonly url:string,
        private readonly httpClient: HttpPostClient<AddAccountInput, AccountModel>
        ){}

    async add (input: AddAccountInput): Promise<AccountModel | null> {
        await this.httpClient.post({
            url: this.url,
            body: input
        })

        return null
    }
}