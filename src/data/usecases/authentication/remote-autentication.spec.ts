import { HttpPostClientSpy } from '../../test/mock-http-client'
import { RemoteAuthentication } from './remote-autentication'

describe('RemoteAuthentication', () => {
  it('should call httpClient with correct url', async () => {
    const url = 'any_url'
    const httpClient = new HttpPostClientSpy()
    const sut = new RemoteAuthentication(url, httpClient)

    await sut.auth()

    expect(httpClient.url).toBe(url)
  })
})
