import { type FieldValidation } from '@/validation/protocols'
import { faker } from '@faker-js/faker'

class EmailValidator implements FieldValidation {
  constructor (readonly field: string) {}

  validate (value: string): Error | null {
    return this.validateEmail(value) ? null : new InvalidFieldError(this.field)
  }

  validateEmail (email: string): RegExpMatchArray | null {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
  };
}

class InvalidFieldError extends Error {
  constructor (fieldName: string) {
    super(`O campo ${fieldName} está invalido`)
    this.name = 'InvalidFieldError'
  }
}

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
