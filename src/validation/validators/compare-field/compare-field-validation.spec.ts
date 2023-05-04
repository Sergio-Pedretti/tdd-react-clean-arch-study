import { CompareFieldValidation } from './compare-field-validation'
import { CompareFieldError } from '@/validation/errors'
import { faker } from '@faker-js/faker'

type SutTypes = {
  sut: CompareFieldValidation
}

const makeSut = (valueToCompare:string): SutTypes => {
  return {
    sut: new CompareFieldValidation('email', valueToCompare)
  }
}

describe('CompareFieldValidation', () => {
  it('should return error if compare is invalid', () => {
    const { sut } = makeSut(faker.random.word())

    const error = sut.validate(faker.random.word())

    expect(error).toEqual(new CompareFieldError())
  })

  it('should return falsy if compare is valid', () => {
    const value = faker.random.word()
    const { sut } = makeSut(value)

    const error = sut.validate(value)

    expect(error).toBeFalsy()
  })
})
