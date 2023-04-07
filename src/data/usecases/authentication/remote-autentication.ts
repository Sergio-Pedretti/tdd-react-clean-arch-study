import { type HttpPostClient } from '@/data/protocols/http/postClient'
import { HttpStatusCode } from '@/data/protocols/http/response'
import { InvalidCredentialsError } from '@/domain/errors/invalid-credentials-error'
import { NotFoundError } from '@/domain/errors/not-found-error'
import { ServerError } from '@/domain/errors/server-error'
import { UnexpectedError } from '@/domain/errors/unexpected-error'
import { type AuthenticationInput } from '@/domain/usecases/authentication'

export class RemoteAuthentication {
  constructor (
    private readonly url: string,
    private readonly httpClient: HttpPostClient
  ) {}

  async auth (input: AuthenticationInput): Promise<void> {
    const httpResponse = await this.httpClient.post({
      url: this.url,
      body: input
    })
    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok: break
      case HttpStatusCode.unauthorized: throw new InvalidCredentialsError()
      case HttpStatusCode.badRequest: throw new UnexpectedError()
      case HttpStatusCode.notFound: throw new NotFoundError()
      case HttpStatusCode.serverError: throw new ServerError()
      default: { await Promise.resolve() }
    }
  }
}
