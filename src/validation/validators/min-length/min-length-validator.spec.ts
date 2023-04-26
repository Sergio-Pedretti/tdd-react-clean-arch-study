import { type FieldValidation } from '@/validation/protocols'

export class MinLengthValidator implements FieldValidation {
  constructor (readonly field: string, private readonly minLength: number) {}

  validate (value: string): Error | null {
    return new MinLengthError(this.minLength)
  }
}

export class MinLengthError extends Error {
  constructor (minLength: number) {
    super(`Campo deve ter pelo menos ${minLength} caracteres`)
  }
}

describe('MinLengthValidator', () => {
  it('should return error if value is invalid', () => {
    const sut = new MinLengthValidator('email', 6)

    const error = sut.validate('')

    expect(error).toEqual(new MinLengthError(6))
  })
})
