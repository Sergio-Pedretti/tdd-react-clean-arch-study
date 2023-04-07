import { type HttpPostClientInput } from '@/data/protocols/http'
import axios from 'axios'

export class AxiosHttpClient {
  async post ({ url, body }: HttpPostClientInput<any>): Promise<void> {
    await axios.post(url, body)
  }
}
