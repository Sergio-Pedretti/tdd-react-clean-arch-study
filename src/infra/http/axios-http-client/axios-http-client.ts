import { type HttpResponse, type HttpPostClientInput, type HttpPostClient } from '@/data/protocols/http'
import axios, { type AxiosResponse } from 'axios'

export class AxiosHttpClient implements HttpPostClient<unknown, unknown> {
  async post ({ url, body }: HttpPostClientInput<unknown>): Promise<HttpResponse<unknown>> {
    let httpResponse: AxiosResponse<unknown>
    try {
      httpResponse = await axios.post(url, body)
    } catch (error) {
      httpResponse = error.response
    }
    return {
      statusCode: httpResponse.status,
      body: httpResponse.data
    }
  }
}
