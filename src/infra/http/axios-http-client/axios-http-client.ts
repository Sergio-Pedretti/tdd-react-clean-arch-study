import { type HttpPostClientInput } from '@/data/protocols/http'
import axios from 'axios'

export class AxiosHttpClient {
  async post ({ url }: HttpPostClientInput<any>): Promise<void> {
    await axios(url)
  }
}
