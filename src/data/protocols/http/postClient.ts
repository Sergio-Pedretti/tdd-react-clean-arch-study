export type HttpPostClientInput = {
  url: string
}
export interface HttpPostClient {
  post: (input: HttpPostClientInput) => Promise<void>
}
