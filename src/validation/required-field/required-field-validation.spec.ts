import { RequiredFieldValidation } from './required-field-validation'
import { RequiredFieldError } from '@/validation/errors'
import { faker } from '@faker-js/faker'

type SutTypes = {
  sut: RequiredFieldValidation
}

const makeSut = (): SutTypes => {
  return {
    sut: new RequiredFieldValidation('email')
  }
}

describe('RequiredFieldValidation', () => {
  it('should return error if field is empty', () => {
    const { sut } = makeSut()

    const error = sut.validate('')

    expect(error).toEqual(new RequiredFieldError())
  })

  it('should return falsy if field is not empty', () => {
    const { sut } = makeSut()

    const error = sut.validate(faker.random.word())

    expect(error).toBeFalsy()
  })
})
