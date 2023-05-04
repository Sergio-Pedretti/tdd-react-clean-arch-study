import { AddAccountInput } from "@/domain/usecases"
import { RemoteAddAccount } from "./remote-add-account"
import { faker } from '@faker-js/faker'
import { AccountModel } from "@/domain/models"
import { HttpPostClientSpy } from "@/data/test"
import { mockAddAccount } from "@/domain/test"
import { HttpStatusCode } from "@/data/protocols/http"
import { EmailInUseError, UnexpectedError } from "@/domain/errors"

type SutTypes = {
  sut: RemoteAddAccount
  httpPostClientSpy: HttpPostClientSpy<AddAccountInput, AccountModel>
}

const makeSut = (url: string = faker.internet.url()): SutTypes => {
  const httpPostClientSpy = new HttpPostClientSpy<AddAccountInput, AccountModel>()
  const sut = new RemoteAddAccount(url, httpPostClientSpy)
  return {
    sut,
    httpPostClientSpy
  }
}

describe('RemoteAddAccount', () => {
  it('should call httpClient with correct url', async () => {
    const url = faker.internet.url()
    const { sut, httpPostClientSpy } = makeSut(url)

    await sut.add(mockAddAccount())

    expect(httpPostClientSpy.url).toBe(url)
  })

  it('should call httpClient with correct body', async () => {
    const { sut, httpPostClientSpy } = makeSut()

    const addAccountInput = mockAddAccount()
    await sut.add(addAccountInput)

    expect(httpPostClientSpy.body).toEqual(addAccountInput)
  })

   it('should throw EmailInUseError if httpClient returns 403', async () => {
    const { sut, httpPostClientSpy } = makeSut()
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.forbidden
    }
    const promise = sut.add(mockAddAccount())

    await expect(promise).rejects.toThrow(new EmailInUseError())
  })

  it('should throw UnexpectedError if httpClient returns 400', async () => {
    const { sut, httpPostClientSpy } = makeSut()
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.badRequest
    }
    const promise = sut.add(mockAddAccount())

    await expect(promise).rejects.toThrow(new UnexpectedError())
  })
})