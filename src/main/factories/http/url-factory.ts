import { Env } from '@/main/config/env'
console.log(Env.apiURL)
export const makeApiUrl = (path: string): string => {
  return `${Env.apiURL}${path}`
}
