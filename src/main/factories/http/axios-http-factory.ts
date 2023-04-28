import { AxiosHttpClient } from '@/infra/http/axios-http-client/axios-http-client'

export const makeAxiosHttp = (): AxiosHttpClient => {
  return new AxiosHttpClient()
}
