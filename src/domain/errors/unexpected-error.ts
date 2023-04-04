export class UnexpectedError extends Error {
  constructor () {
    super('Unexpected Error Ocurred. Try again soon')
    this.name = 'UnexpectedError'
  }
}
