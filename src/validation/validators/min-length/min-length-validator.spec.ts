import { type FieldValidation } from '@/validation/protocols'

export class MinLengthValidator implements FieldValidation {
  constructor (readonly field: string, private readonly minLength: number) {}

  validate (value: string): Error | null {
    return value.length > this.minLength ? null : new MinLengthError(this.minLength)
  }
}

export class MinLengthError extends Error {
  constructor (minLength: number) {
    super(`Campo deve ter pelo menos ${minLength} caracteres`)
  }
}

describe('MinLengthValidator', () => {
  it('should return error if value is invalid', () => {
    const sut = new MinLengthValidator('field', 8)

    const error = sut.validate('err')

    expect(error).toEqual(new MinLengthError(8))
  })

  it('should return falsy if value is valid', () => {
    const sut = new MinLengthValidator('field', 3)

    const result = sut.validate('valid')

    expect(result).toBeFalsy()
  })
})
