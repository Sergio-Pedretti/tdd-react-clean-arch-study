export class InvalidFieldError extends Error {
  constructor (fieldName: string) {
    super(`O campo ${fieldName} está invalido`)
    this.name = 'InvalidFieldError'
  }
}
