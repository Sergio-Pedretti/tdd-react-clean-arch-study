import { MinLengthValidator } from './min-length-validator'
import { MinLengthError } from '@/validation/errors'

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
