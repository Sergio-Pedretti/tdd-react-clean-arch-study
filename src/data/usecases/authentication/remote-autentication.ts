import { type HttpPostClient } from 'data/protocols/http/postClient'

export class RemoteAuthentication {
  constructor (
    private readonly url: string,
    private readonly httpClient: HttpPostClient
  ) {}

  async auth (): Promise<void> {
    await this.httpClient.post({ url: this.url })
  }
}
