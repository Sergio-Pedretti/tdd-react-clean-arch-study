import { mockAuthentication, mockAccountModel } from '@/domain/test'
import { HttpPostClientSpy } from '@/data/test'
import { RemoteAuthentication } from '@/data/usecases/authentication/remote-autentication'
import { InvalidCredentialsError, UnexpectedError, ServerError, NotFoundError } from '@/domain/errors'
import { HttpStatusCode } from '@/data/protocols/http'
import { type AuthenticationInput } from '@/domain/usecases'
import { type AccountModel } from '@/domain/models'
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

  it('should return AccountModel if httpClient returns 200', async () => {
    const { sut, httpPostClientSpy } = makeSut()
    const httpResult = mockAccountModel()
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.ok,
      body: httpResult
    }

    const account = await sut.auth(mockAuthentication())

    expect(account).toEqual(httpResult)
  })
})
