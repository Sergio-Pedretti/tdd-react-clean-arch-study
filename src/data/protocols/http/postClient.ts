export type HttpPostClientInput = {
  url: string
  body?: object
}
export interface HttpPostClient {
  post: (input: HttpPostClientInput) => Promise<void>
}
