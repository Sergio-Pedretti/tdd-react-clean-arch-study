import { type HttpPostClient } from 'data/protocols/http/postClient'
import { RemoteAuthentication } from './remote-autentication'

describe('RemoteAuthentication', () => {
  it('should call httpClient with correct url', async () => {
    class HttpPostClientSpy implements HttpPostClient {
      url?: string

      async post (url: string): Promise<void> {
        this.url = url
        await Promise.resolve()
      }
    }

    const url = 'any_url'
    const httpClient = new HttpPostClientSpy()
    const sut = new RemoteAuthentication(url, httpClient)

    await sut.auth()

    expect(httpClient.url).toBe(url)
  })
})
