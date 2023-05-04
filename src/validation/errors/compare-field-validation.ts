export class CompareFieldError extends Error {
  constructor () {
    super('Campos não são iguais!')
    this.name = 'CompareFieldError'
  }
}
