import { type HttpPostClientInput, type HttpPostClient } from '../protocols/http/postClient'

export class HttpPostClientSpy implements HttpPostClient {
  url?: string

  async post ({ url }: HttpPostClientInput): Promise<void> {
    this.url = url
    await Promise.resolve()
  }
}
