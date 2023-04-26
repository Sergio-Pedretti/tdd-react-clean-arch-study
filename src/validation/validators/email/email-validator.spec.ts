import { EmailValidator } from './email-validator'
import { InvalidFieldError } from '@/validation/errors'
import { faker } from '@faker-js/faker'

describe('EmailValidator', () => {
  it('should return error if email is invalid', () => {
    const sut = new EmailValidator('email')

    const error = sut.validate('')

    expect(error).toEqual(new InvalidFieldError('email'))
  })

  it('should return falsy if email is valid', () => {
    const sut = new EmailValidator('email')

    const result = sut.validate(faker.internet.email())

    expect(result).toBeFalsy()
  })
})
