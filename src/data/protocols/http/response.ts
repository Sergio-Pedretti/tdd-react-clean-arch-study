export type HttpResponse = {
  statusCode: HttpStatusCode
  body?: any
}

export enum HttpStatusCode {
  unauthorized = 401,
  noContent = 204,
  badRequest = 400,
}
