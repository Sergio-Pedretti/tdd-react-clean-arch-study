export class MinLengthError extends Error {
  constructor (minLength: number) {
    super(`Campo deve ter pelo menos ${minLength} caracteres`)
  }
}
