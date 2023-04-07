import { HttpStatusCode } from '@/data/protocols/http'
import { type AccountModel } from '@/domain/models'
import { type HttpPostClient } from '@/data/protocols/http'
import { type AuthenticationInput, type Authentication } from '@/domain/usecases'
import { InvalidCredentialsError, NotFoundError, ServerError, UnexpectedError } from '@/domain/errors'

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
