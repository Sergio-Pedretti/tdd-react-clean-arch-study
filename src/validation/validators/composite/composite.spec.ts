import { FieldValidationSpy } from '@/validation/test/mock-field-validation'
import { ValidationComposite } from './composite'

type SutTypes = {
  sut: ValidationComposite
  fieldValidationSpy: FieldValidationSpy[]
}

const makeSut = (): SutTypes => {
  const fieldValidationSpy = [
    new FieldValidationSpy('any_field'),
    new FieldValidationSpy('any_field')
  ]
  const sut = new ValidationComposite(fieldValidationSpy)
  return {
    sut,
    fieldValidationSpy
  }
}

describe('ValidationComposite', () => {
  it('should return error if any validation fails', () => {
    const { sut, fieldValidationSpy } = makeSut()
    fieldValidationSpy[0].error = new Error('first_error')
    fieldValidationSpy[1].error = new Error('second_error')

    const error = sut.validate('any_field', 'any_value')

    expect(error).toBe('first_error')
  })

  it('should return falsy if validation succeed', () => {
    const { sut } = makeSut()

    const result = sut.validate('any_field', 'any_value')

    expect(result).toBeFalsy()
  })
})
