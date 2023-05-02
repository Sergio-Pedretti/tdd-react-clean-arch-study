type EnvType = {
  apiURL: string
}

export const Env: EnvType = {
  apiURL: process.env.VITE_API_URL ?? ''
}
