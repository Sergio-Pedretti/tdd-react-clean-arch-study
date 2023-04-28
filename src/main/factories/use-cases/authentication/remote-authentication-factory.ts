import { type Authentication } from '@/domain/usecases'
import { makeAxiosHttp, makeApiUrl } from '@/main/factories/http'
import { RemoteAuthentication } from '@/data/usecases/authentication/remote-autentication'

export const makeRemoteAuthentication = (): Authentication => {
  return new RemoteAuthentication(makeApiUrl('/login'), makeAxiosHttp())
}
