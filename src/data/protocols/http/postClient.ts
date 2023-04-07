import { type HttpResponse } from '@/data/protocols/http/response'

export type HttpPostClientInput<T> = {
  url: string
  body?: T
}
export interface HttpPostClient<T, R> {
  post: (input: HttpPostClientInput<T>) => Promise<HttpResponse<R> >
}
