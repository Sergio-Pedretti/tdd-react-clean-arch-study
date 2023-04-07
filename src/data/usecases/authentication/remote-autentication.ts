import { type HttpPostClient } from '@/data/protocols/http/postClient'
import { HttpStatusCode } from '@/data/protocols/http/response'
import { InvalidCredentialsError } from '@/domain/errors/invalid-credentials-error'
import { NotFoundError } from '@/domain/errors/not-found-error'
import { ServerError } from '@/domain/errors/server-error'
import { UnexpectedError } from '@/domain/errors/unexpected-error'
import { type AccountModel } from '@/domain/models/account-model'
import { type AuthenticationInput, type Authentication } from '@/domain/usecases/authentication'

export class RemoteAuthentication implements Authentication {
  constructor (
    private readonly url: string,
    private readonly httpClient: HttpPostClient<AuthenticationInput, AccountModel>
  ) {}

  async auth (input: AuthenticationInput): Promise<AccountModel | undefined> {
    const httpResponse = await this.httpClient.post({
      url: this.url,
      body: input
    })
    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok: return httpResponse.body
      case HttpStatusCode.unauthorized: throw new InvalidCredentialsError()
      case HttpStatusCode.badRequest: throw new UnexpectedError()
      case HttpStatusCode.notFound: throw new NotFoundError()
      case HttpStatusCode.serverError: throw new ServerError()
      default: throw new UnexpectedError()
    }
  }
}
