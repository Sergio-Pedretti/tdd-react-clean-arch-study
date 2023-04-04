import { type HttpResponse } from '@/data/protocols/http/response'

export type HttpPostClientInput = {
  url: string
  body?: object
}
export interface HttpPostClient {
  post: (input: HttpPostClientInput) => Promise<HttpResponse>
}
