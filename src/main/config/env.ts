type EnvType = {
  apiURL: string
}

export const env: EnvType = {
  apiURL: process.env.VITE_API_URL ?? ''
}
