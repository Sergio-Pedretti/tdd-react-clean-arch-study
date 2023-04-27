import { MinLengthValidator } from './min-length-validator'
import { MinLengthError } from '@/validation/errors'

type SutTypes = {
  sut: MinLengthValidator
}

const makeSut = (field: string, minLength: number): SutTypes => {
  return {
    sut: new MinLengthValidator(field, minLength)
  }
}

describe('MinLengthValidator', () => {
  it('should return error if value is invalid', () => {
    const { sut } = makeSut('any_field', 8)

    const error = sut.validate('err')

    expect(error).toEqual(new MinLengthError(8))
  })

  it('should return falsy if value is valid', () => {
    const { sut } = makeSut('any_field', 3)

    const result = sut.validate('valid')

    expect(result).toBeFalsy()
  })
})
