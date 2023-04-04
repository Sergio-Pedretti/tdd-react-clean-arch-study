import { type HttpPostClient } from '@/data/protocols/http/postClient'
import { HttpStatusCode } from '@/data/protocols/http/response'
import { InvalidCredentialsError } from '@/domain/errors/invalid-credentials-error'
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
      case HttpStatusCode.unauthorized: throw new InvalidCredentialsError()
      case HttpStatusCode.badRequest: throw new UnexpectedError()
      default: { await Promise.resolve() }
    }
  }
}
