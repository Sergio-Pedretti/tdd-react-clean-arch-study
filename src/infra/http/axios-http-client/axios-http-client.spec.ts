import { AxiosHttpClient } from './axios-http-client'
import axios from 'axios'
import { faker } from '@faker-js/faker'
import { type HttpPostClientInput } from '@/data/protocols/http'

jest.mock('axios')

const mockedAxios = axios as jest.Mocked<typeof axios>

const mockedAxiosResult = {
  data: faker.datatype.json(),
  status: faker.random.numeric()
}
mockedAxios.post.mockResolvedValue(mockedAxiosResult)

const makeSut = (): AxiosHttpClient => {
  return new AxiosHttpClient()
}

const mockPostRequest = (): HttpPostClientInput<any> => ({
  url: faker.internet.url(),
  body: faker.datatype.json()
})

describe('AxiosHttpClient', () => {
  it('should call Axios with correct values', async () => {
    const request = mockPostRequest()
    const sut = makeSut()

    await sut.post(request)

    expect(mockedAxios.post).toHaveBeenCalledWith(request.url, request.body)
    expect(mockedAxios.post).toHaveBeenCalledTimes(1)
  })

  it('should return the correct statusCode and body', async () => {
    const request = mockPostRequest()
    const sut = makeSut()

    const response = await sut.post(request)

    expect(response).toEqual({
      statusCode: mockedAxiosResult.status,
      body: mockedAxiosResult.data
    })
  })
})
