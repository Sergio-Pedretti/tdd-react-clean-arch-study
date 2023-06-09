import axios from 'axios'
import { faker } from '@faker-js/faker'

export const mockHttpResponse = (): unknown => ({
  data: faker.datatype.json(),
  status: faker.random.numeric()
})

export const mockAxios = (): jest.Mocked<typeof axios> => {
  const mockedAxios = axios as jest.Mocked<typeof axios>
  mockedAxios.post.mockResolvedValue(mockHttpResponse())
  return mockedAxios
}
