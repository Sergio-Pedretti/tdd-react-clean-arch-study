import { type HttpResponse, type HttpPostClientInput, type HttpPostClient } from '@/data/protocols/http'
import axios from 'axios'

export class AxiosHttpClient implements HttpPostClient<any, any> {
  async post ({ url, body }: HttpPostClientInput<any>): Promise<HttpResponse<any>> {
    const httpResponse = await axios.post(url, body)
    return {
      statusCode: httpResponse.status,
      body: httpResponse.data
    }
  }
}
