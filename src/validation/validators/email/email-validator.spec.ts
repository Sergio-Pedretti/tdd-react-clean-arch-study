import { EmailValidator } from './email-validator'
import { InvalidFieldError } from '@/validation/errors'
import { faker } from '@faker-js/faker'

type SutTypes = {
  sut: EmailValidator
}

const makeSut = (): SutTypes => {
  return {
    sut: new EmailValidator('email')
  }
}

describe('EmailValidator', () => {
  it('should return error if email is invalid', () => {
    const { sut } = makeSut()

    const error = sut.validate('')

    expect(error).toEqual(new InvalidFieldError('email'))
  })

  it('should return falsy if email is valid', () => {
    const { sut } = makeSut()

    const result = sut.validate(faker.internet.email())

    expect(result).toBeFalsy()
  })
})
