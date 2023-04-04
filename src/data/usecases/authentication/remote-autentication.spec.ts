import { mockAuthentication } from '@/domain/test/mock-authentication'
import { HttpPostClientSpy } from '@/data/test/mock-http-client'
import { RemoteAuthentication } from '@/data/usecases/authentication/remote-autentication'
import { faker } from '@faker-js/faker'

type SutTypes = {
  sut: RemoteAuthentication
  httpPostClientSpy: HttpPostClientSpy
}

const makeSut = (url: string = faker.internet.url()): SutTypes => {
  const httpPostClientSpy = new HttpPostClientSpy()
  const sut = new RemoteAuthentication(url, httpPostClientSpy)
  return {
    sut,
    httpPostClientSpy
  }
}

describe('RemoteAuthentication', () => {
  it('should call httpClient with correct url', async () => {
    const url = faker.internet.url()
    const { sut, httpPostClientSpy } = makeSut(url)

    await sut.auth(mockAuthentication())

    expect(httpPostClientSpy.url).toBe(url)
  })

  it('should call httpClient with correct body', async () => {
    const { sut, httpPostClientSpy } = makeSut()

    const authenticationInput = mockAuthentication()
    await sut.auth(authenticationInput)

    expect(httpPostClientSpy.body).toEqual(authenticationInput)
  })
})
