import { env } from '@/main/config/env'

export const makeApiUrl = (path: string): string => {
  return `${env.apiURL}${path}`
}
