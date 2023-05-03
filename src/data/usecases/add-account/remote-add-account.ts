import { HttpPostClient, HttpStatusCode } from "@/data/protocols/http";
import { EmailInUseError, UnexpectedError } from "@/domain/errors";
import { AccountModel } from "@/domain/models";
import { AddAccount, AddAccountInput } from "@/domain/usecases";

export class RemoteAddAccount implements AddAccount {
    constructor(
        private readonly url:string,
        private readonly httpClient: HttpPostClient<AddAccountInput, AccountModel>
        ){}

    async add (input: AddAccountInput): Promise<AccountModel | undefined> {
        const httpResponse = await this.httpClient.post({
            url: this.url,
            body: input
        })

        switch(httpResponse.statusCode){
            case HttpStatusCode.ok: return httpResponse.body
            case HttpStatusCode.forbidden: throw new EmailInUseError()
            default: throw new UnexpectedError()
        }

        return undefined
    }
}