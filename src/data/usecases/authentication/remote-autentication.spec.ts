import { mockAuthentication } from '@/domain/test/mock-authentication'
import { HttpPostClientSpy } from '@/data/test/mock-http-client'
import { RemoteAuthentication } from '@/data/usecases/authentication/remote-autentication'
import { InvalidCredentialsError } from '@/domain/errors/invalid-credentials-error'
import { HttpStatusCode } from '@/data/protocols/http/response'
import { UnexpectedError } from '@/domain/errors/unexpected-error'
import { ServerError } from '@/domain/errors/server-error'
import { NotFoundError } from '@/domain/errors/not-found-error'
import { type AuthenticationInput } from '@/domain/usecases/authentication'
import { type AccountModel } from '@/domain/models/account-model'
import { faker } from '@faker-js/faker'

type SutTypes = {
  sut: RemoteAuthentication
  httpPostClientSpy: HttpPostClientSpy<AuthenticationInput, AccountModel>
}

const makeSut = (url: string = faker.internet.url()): SutTypes => {
  const httpPostClientSpy = new HttpPostClientSpy<AuthenticationInput, AccountModel>()
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

  it('should throw InvalidCredentialsError if httpClient returns 401', async () => {
    const { sut, httpPostClientSpy } = makeSut()
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.unauthorized
    }
    const promise = sut.auth(mockAuthentication())

    await expect(promise).rejects.toThrow(new InvalidCredentialsError())
  })

  it('should throw UnexpectedError if httpClient returns 400', async () => {
    const { sut, httpPostClientSpy } = makeSut()
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.badRequest
    }
    const promise = sut.auth(mockAuthentication())

    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  it('should throw ServerError if httpClient returns 500', async () => {
    const { sut, httpPostClientSpy } = makeSut()
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.serverError
    }
    const promise = sut.auth(mockAuthentication())

    await expect(promise).rejects.toThrow(new ServerError())
  })

  it('should throw NotFoundError if httpClient returns 404', async () => {
    const { sut, httpPostClientSpy } = makeSut()
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.notFound
    }
    const promise = sut.auth(mockAuthentication())

    await expect(promise).rejects.toThrow(new NotFoundError())
  })
})
