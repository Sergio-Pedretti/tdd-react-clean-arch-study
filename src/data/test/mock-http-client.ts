import { type HttpPostClientInput, type HttpPostClient } from '../protocols/http/postClient'

export class HttpPostClientSpy implements HttpPostClient {
  url?: string
  body?: object

  async post ({ url, body }: HttpPostClientInput): Promise<void> {
    this.url = url
    this.body = body
    await Promise.resolve()
  }
}
