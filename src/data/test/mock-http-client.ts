import { type HttpPostClientInput, type HttpPostClient } from '@/data/protocols/http/postClient'
import { HttpStatusCode, type HttpResponse } from '@/data/protocols/http/response'

export class HttpPostClientSpy implements HttpPostClient {
  url?: string
  body?: object
  response: HttpResponse = {
    statusCode: HttpStatusCode.ok
  }

  async post ({ url, body }: HttpPostClientInput): Promise<HttpResponse> {
    this.url = url
    this.body = body
    return await Promise.resolve(this.response)
  }
}
