import { type HttpPostClient } from 'data/protocols/http/postClient'
import { type AuthenticationInput } from 'domain/usecases/authentication'

export class RemoteAuthentication {
  constructor (
    private readonly url: string,
    private readonly httpClient: HttpPostClient
  ) {}

  async auth (input: AuthenticationInput): Promise<void> {
    await this.httpClient.post({
      url: this.url,
      body: input
    })
  }
}
