import { AxiosHttpClient } from '@/infra/http/axios-http-client/axios-http-client'
import { mockPostRequest } from '@/data/test'
import { mockAxios, mockHttpResponse } from '@/infra/http/test'
import type axios from 'axios'

jest.mock('axios')

type SutTypes = {
  sut: AxiosHttpClient
  mockedAxios: jest.Mocked<typeof axios>
}

const makeSut = (): SutTypes => {
  const sut = new AxiosHttpClient()
  const mockedAxios = mockAxios()
  return {
    sut,
    mockedAxios
  }
}

describe('AxiosHttpClient', () => {
  it('should call Axios with correct values', async () => {
    const request = mockPostRequest()
    const { sut, mockedAxios } = makeSut()

    await sut.post(request)

    expect(mockedAxios.post).toHaveBeenCalledWith(request.url, request.body)
    expect(mockedAxios.post).toHaveBeenCalledTimes(1)
  })

  it('should return the correct statusCode and body', async () => {
    const { sut, mockedAxios } = makeSut()
    const request = mockPostRequest()

    const promise = sut.post(request)

    expect(promise).toEqual(mockedAxios.post.mock.results[0].value)
  })

  it('should return the correct statusCode and body on failure', async () => {
    const { sut, mockedAxios } = makeSut()
    const request = mockPostRequest()
    mockedAxios.post.mockRejectedValueOnce({
      response: mockHttpResponse()
    })
    const promise = sut.post(request)

    expect(promise).toEqual(mockedAxios.post.mock.results[0].value)
  })
})
