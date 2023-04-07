export type HttpResponse = {
  statusCode: HttpStatusCode
  body?: any
}

export enum HttpStatusCode {
  unauthorized = 401,
  noContent = 204,
  badRequest = 400,
  ok = 200,
  serverError = 500,
  notFound = 404
}
