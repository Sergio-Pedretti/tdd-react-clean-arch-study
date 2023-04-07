import { type HttpPostClientInput, type HttpPostClient } from '@/data/protocols/http/postClient'
import { HttpStatusCode, type HttpResponse } from '@/data/protocols/http/response'

export class HttpPostClientSpy<T, R> implements HttpPostClient<T, R> {
  url?: string
  body?: T
  response: HttpResponse<R> = {
    statusCode: HttpStatusCode.ok
  }

  async post ({ url, body }: HttpPostClientInput<T>): Promise<HttpResponse<R>> {
    this.url = url
    this.body = body
    return await Promise.resolve(this.response)
  }
}
