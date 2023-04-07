export class ServerError extends Error {
  constructor () {
    super('An internal Server Error ocurred.')
    this.name = 'ServerError'
  }
}
